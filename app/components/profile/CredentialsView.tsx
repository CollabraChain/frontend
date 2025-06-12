
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, ExternalLink, Calendar, User, Award, CheckCircle } from "lucide-react";
import { useReputation, VerifiableCredential } from '@/hooks/useReputation';

export default function CredentialsView() {
  const { credentials, verifyCredential, isLoading } = useReputation();
  const [selectedCredential, setSelectedCredential] = useState<VerifiableCredential | null>(null);

  const getCredentialIcon = (type: VerifiableCredential['type']) => {
    switch (type) {
      case 'skill':
        return <Award className="h-5 w-5 text-trust-blue" />;
      case 'project_completion':
        return <CheckCircle className="h-5 w-5 text-energy-green" />;
      case 'client_feedback':
        return <User className="h-5 w-5 text-purple-600" />;
      case 'certification':
        return <Shield className="h-5 w-5 text-amber-500" />;
      default:
        return <Award className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getCredentialColor = (type: VerifiableCredential['type']) => {
    switch (type) {
      case 'skill':
        return 'bg-trust-blue/10 text-trust-blue';
      case 'project_completion':
        return 'bg-energy-green/10 text-energy-green';
      case 'client_feedback':
        return 'bg-purple-600/10 text-purple-600';
      case 'certification':
        return 'bg-amber-500/10 text-amber-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleVerifyCredential = async (credentialId: string) => {
    try {
      await verifyCredential(credentialId);
    } catch (error) {
      console.error('Failed to verify credential:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-trust-blue" />
            Verifiable Credentials ({credentials.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {credentials.map((credential) => (
              <div
                key={credential.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelectedCredential(credential)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getCredentialIcon(credential.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{credential.title}</h4>
                        {credential.verified && (
                          <CheckCircle className="h-4 w-4 text-energy-green" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {credential.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {credential.issuer}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(credential.issuedDate).toLocaleDateString()}
                        </div>
                        {credential.metadata.rating && (
                          <div className="flex items-center gap-1">
                            <span>Rating: {credential.metadata.rating}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant="secondary"
                      className={getCredentialColor(credential.type)}
                    >
                      {credential.type.replace('_', ' ')}
                    </Badge>
                    {credential.verified ? (
                      <Badge variant="secondary" className="bg-energy-green/10 text-energy-green">
                        Verified
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVerifyCredential(credential.id);
                        }}
                        disabled={isLoading}
                      >
                        Verify
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Credential Modal */}
      {selectedCredential && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getCredentialIcon(selectedCredential.type)}
              Credential Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{selectedCredential.title}</h3>
              <p className="text-muted-foreground">{selectedCredential.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Issuer:</span>
                <div className="text-muted-foreground">{selectedCredential.issuer}</div>
              </div>
              <div>
                <span className="font-medium">Issue Date:</span>
                <div className="text-muted-foreground">
                  {new Date(selectedCredential.issuedDate).toLocaleDateString()}
                </div>
              </div>
              {selectedCredential.expiryDate && (
                <div>
                  <span className="font-medium">Expires:</span>
                  <div className="text-muted-foreground">
                    {new Date(selectedCredential.expiryDate).toLocaleDateString()}
                  </div>
                </div>
              )}
              <div>
                <span className="font-medium">Status:</span>
                <div className="flex items-center gap-1">
                  {selectedCredential.verified ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-energy-green" />
                      <span className="text-energy-green">Verified</span>
                    </>
                  ) : (
                    <span className="text-amber-500">Pending Verification</span>
                  )}
                </div>
              </div>
            </div>

            {selectedCredential.onChainHash && (
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">On-Chain Hash:</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      // In a real implementation, this would open a block explorer
                      console.log('Opening block explorer for:', selectedCredential.onChainHash);
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View on Base
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  {selectedCredential.onChainHash}
                </div>
              </div>
            )}

            <Button
              onClick={() => setSelectedCredential(null)}
              className="w-full"
              variant="outline"
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
