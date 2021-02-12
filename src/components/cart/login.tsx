interface ILogin {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  authUser: Record<string, unknown>;
}

function Login({ setStep, authUser }: ILogin) {
  if (authUser.clientInitialized && authUser.email) {
    setStep(3);
  }
  return (
    <>
      <div>Login</div>
    </>
  );
}

export { Login };
