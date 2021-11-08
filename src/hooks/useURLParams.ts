import { useState, useEffect } from 'react';

interface IURLParams {
  articleIndex: number;
}

interface IProps {
  pathname: string;
}

export default function useURLParams({ pathname }: IProps) {
  const [data, setData] = useState<IURLParams>({
    articleIndex: 0,
  });

  useEffect(() => {
    let articleIndex = pathname.split('/')[2];

    if (articleIndex.includes('?')) {
      [articleIndex] = articleIndex.split('?');
    }

    // index로 저장하기 때문에 1을 뺌
    setData({
      articleIndex: Number(articleIndex) - 1 || 0,
    });
  }, [pathname]);

  return data;
}
