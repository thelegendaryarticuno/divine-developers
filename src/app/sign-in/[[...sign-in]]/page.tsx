import React from 'react';
import { SignIn } from '@clerk/nextjs';

const SignInPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center mt-7 y-min-h-screen">
      <SignIn />
    </div>
  );
};

export default SignInPage;
