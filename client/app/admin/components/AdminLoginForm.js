'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";

export const AdminLoginForm = ({
  email,
  password,
  error,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleSubmit(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <Card className="group w-full max-w-md p-8 shadow-2xl transition-all duration-500 hover:shadow-3xl backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/15">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <p className="text-sm text-gray-300/90">
            Enter your credentials to access admin portal
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Label htmlFor="email" className="text-gray-300/90">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={handleEmailChange}
                className="mt-2 bg-white/5 border-white/20 text-gray-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Label htmlFor="password" className="text-gray-300/90">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={handlePasswordChange}
                className="mt-2 bg-white/5 border-white/20 text-gray-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 placeholder:text-gray-400"
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <Alert 
              variant="destructive" 
              className="py-3 text-sm border-red-400/50 bg-red-500/10 text-red-200"
            >
              {error}
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20 active:scale-95"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              <span className="drop-shadow-md">Sign In</span>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};