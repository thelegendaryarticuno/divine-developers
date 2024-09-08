import { SignUp } from '@clerk/nextjs';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center mt-7 y-min-h-screen">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
