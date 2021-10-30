import { useState, useEffect } from 'react';

interface IURLParams {
  articleIndex: number;
}

export default function useURLParams() {
  const [data, setData] = useState<IURLParams>({
    articleIndex: 0,
  });
  const urlParams = window.location.pathname;

  useEffect(() => {
    // index로 저장하기 때문에 1을 뺌
    setData({
      articleIndex: Number(urlParams.split('/article/')[1]) - 1 || 0,
    });
  }, [urlParams]);

  return data;
}
