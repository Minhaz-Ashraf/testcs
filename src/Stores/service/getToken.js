export const getToken = () => {
    try {
      const token = localStorage.getItem('authToken');
      return token;
    } catch (err) {
      console.log(err);
      return null;
    }
  };