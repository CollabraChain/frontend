import { useEffect, useState, useCallback, useMemo } from 'react';
import { Client, Conversation, DecodedMessage } from '@xmtp/xmtp-js';
import { useAccount, useConnectorClient } from 'wagmi';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import type { Account, Chain, Client as ViemClient, Transport } from 'viem';
import type { Config } from 'wagmi';

// Ethers.js adapter for wagmi v2
function clientToSigner(client: ViemClient<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  return new JsonRpcSigner(provider, account.address);
}

function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}

export function useXMTP(peerAddress?: string) {
  const signer = useEthersSigner();
  const { address: myAddress, isConnected } = useAccount();
  const [client, setClient] = useState<Client | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<DecodedMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize XMTP client
  useEffect(() => {
    if (!signer || !isConnected) return;
    let isMounted = true;
    setIsLoading(true);
    Client.create(signer, { env: 'production' })
      .then((xmtpClient) => {
        if (isMounted) {
          setClient(xmtpClient);
        }
      })
      .catch((err) => {
        setError('Failed to initialize XMTP: ' + err.message);
      })
      .finally(() => setIsLoading(false));
    return () => {
      isMounted = false;
    };
  }, [signer, isConnected]);

  // Initialize conversation
  useEffect(() => {
    if (!client || !peerAddress) return;
    let isMounted = true;
    setIsLoading(true);
    client.conversations
      .newConversation(peerAddress)
      .then((conv) => {
        if (isMounted) {
          setConversation(conv);
        }
      })
      .catch((err) => {
        setError('Failed to start conversation: ' + err.message);
      })
      .finally(() => setIsLoading(false));
    return () => {
      isMounted = false;
    };
  }, [client, peerAddress]);

  // Load messages
  useEffect(() => {
    if (!conversation) return;
    let isMounted = true;
    setIsLoading(true);
    conversation
      .messages()
      .then((msgs) => {
        if (isMounted) {
          setMessages(msgs);
        }
      })
      .catch((err) => {
        setError('Failed to load messages: ' + err.message);
      })
      .finally(() => setIsLoading(false));
    return () => {
      isMounted = false;
    };
  }, [conversation]);

  // Subscribe to new messages
  const subscribeToMessages = useCallback(() => {
    if (!conversation) return;
    const streamMessages = async () => {
      for await (const msg of await conversation.streamMessages()) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    streamMessages();
  }, [conversation]);

  // Send a message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!conversation) throw new Error('No conversation');
      await conversation.send(content);
    },
    [conversation]
  );

  return {
    client,
    isLoading,
    error,
    sendMessage,
    messages,
    subscribeToMessages,
    myAddress,
  };
} 