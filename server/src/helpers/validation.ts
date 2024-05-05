export function validarEmail(email: string) {
    const regexemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexemail.test(email);
  }


  