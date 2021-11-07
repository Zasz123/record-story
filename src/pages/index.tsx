import { useEffect } from 'react';
import { navigate } from 'gatsby';

function IndexPage() {
  useEffect(() => {
    navigate('/article/1');
  }, []);

  return <div />;
}

export default IndexPage;
