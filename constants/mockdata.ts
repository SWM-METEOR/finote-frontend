export const articleData = {
  page: 0,
  size: 10,
  articleList: [
    {
      id: 0,
      title: 'HTTPS란 무엇인가?',
      body: '텍스트 기반의 통신 규약으로 인터넷에서 데이터를 주고받을 수 있는 프로토콜이다. 이렇게 규약을 정해두었기 때문에 모든 프로그램이 이 규약에 맞춰 개발해서 서로 정보를 교환할 수 있게 되었다.',
      totalLike: 21,
      reply: 3,
      authorNickname: 'string',
      date: '2023.08.24',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxOL0cORwHWnlq9cME7Gpe5wFi7tMVAu1IpQ&usqp=CAU',
    },
    {
      id: 2,
      title: 'HTTP와 HTTP의 차이점',
      body: 'HTTP: HTTP는 데이터를 암호화하지 않고 전송합니다. 따라서 민감한 정보(비밀번호, 개인정보 등)를 전송할 때 보안에 취약할 수 있습니다. 해커나 중간자 공격자가 데이터를 가로챌 수 있습니다.',
      totalLike: 8,
      reply: 0,
      authorNickname: 'string',
      date: '2023.08.18',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcOoX2uFpH0uYmhVCnAi5JnvIgoPy6vsl8rguTsbhvvqtmhffp9E1fRzvLPcrfIWmJVqc&usqp=CAU',
    },
    {
      id: 3,
      title: 'HTTP 메서드: 웹 요청의 다양한 풍부함',
      body: 'HTTP 요청은 다양한 메서드를 사용하여 서버에 작업을 지시합니다. GET 메서드는 데이터를 조회할 때, POST 메서드는 데이터를 서버로 전송할 때 사용됩니다. PUT은 데이터를 갱신하고, DELETE는 데이터를 삭제할 때 활용됩니다. 각 메서드는 명확한 의미와 목적을 가지고 있어 웹 응용 프로그램의 기능을 구현하는 데 중요한 역할을 합니다.',
      totalLike: 2,
      reply: 1,
      authorNickname: 'string',
      date: '2023.08.22',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDuFe9PzDLQtDC1URJQdqVRSIfag29Ykeupl3s_JuZcgL4vLy9zmuel3RrXo0RQBDuUSM&usqp=CAU',
    },
    {
      id: 4,
      title: 'HTTP 상태 코드의 의미와 활용',
      body: '서버는 클라이언트의 요청을 처리한 후, 성공, 리다이렉션, 클라이언트 오류, 서버 오류 등의 상태를 나타내는 3자리 숫자 HTTP 상태 코드를 응답으로 반환합니다. 예를 들어, 200 OK는 성공적인 요청을 나타내며, 404 Not Found는 요청한 리소스를 찾을 수 없음을 나타냅니다. 이를 통해 클라이언트는 요청의 결과를 파악할 수 있습니다.',
      totalLike: 20,
      reply: 3,
      authorNickname: 'string',
      date: '2023.08.11',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTio6BLMwgdSbmzMszytNulc9EkIWOrxv75sw&usqp=CAU',
    },
    {
      id: 5,
      title: '더 알고 싶은 HTTP 헤더: 데이터 교환의 비밀스러운 조력자',
      body: 'HTTP 요청과 응답은 헤더라 불리는 부가적인 메타데이터를 포함합니다. 이 헤더는 클라이언트와 서버 간에 정보를 전달하고 확장 가능한 구조를 제공합니다. 예를 들어, 쿠키를 이용하여 사용자 상태를 유지하거나, 사용자 에이전트 정보를 전달할 수 있습니다. 이러한 헤더는 요청과 응답의 내용을 조정하고 보완하는 데 도움을 줍니다.',
      totalLike: 129,
      reply: 17,
      authorNickname: 'string',
      date: '2023.07.21',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJmx2zMTUnX__GG0XXd7Bevrr-ve3vMnJDxQ&usqp=CAU',
    },
    {
      id: 6,
      title: '웹 성능 혁신, HTTP/2와 HTTP/3의 등장',
      body: 'HTTP/2는 기존의 HTTP/1.1을 대체하는 프로토콜로, 성능 개선을 위한 다양한 기능을 제공합니다. 이중화 기술을 통해 한 연결에서 여러 요청과 응답을 동시에 처리하여 웹 페이지 로딩 속도를 향상시킵니다. 반면, HTTP/3는 전송을 위해 TCP 대신에 UDP를 기반으로 하는 프로토콜입니다. 이는 빠른 데이터 전송과 연결의 안정성을 모두 확보할 수 있게 합니다. 둘 다 웹 통신의 효율성을',
      totalLike: 0,
      reply: 6,
      authorNickname: 'string',
      date: '2023.06.29',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPJyJHn6CSJoyS7QFbfPfbjMrxmav5bh_lOw&usqp=CAU',
    },
  ],
};

export const relatedArticlesData = [
  {
    keyword: 'HTTPS',
    articleList: [
      {
        id: 0,
        title: 'HTTPS로 쿠키값 주고받기',
        body: 'HTTP Only Cookie를 사용하면 Client에서 Javascript를 통한 쿠키 탈취문제를 예방할 수 있습니다. 하지만, Javascript가 아닌 네트워크를 직접 감청하여 쿠키를 가로챌 수도 있습니다. 미국의 NSA를 포함한 각국의 정보기관들이 Wifi 망 분석, ISP 케이블 감청을 통해 쿠키 등 개인정보를 열람하고 있다는 사실은 더 이상 공공연한 비밀이 아닙니다. 이러한 통신상의 정보유출을 막기 위해, HTTPS 프로토콜을 사용하여 데이터를 암호화하는 방법이 주로 사용되고 있습니다. HTTPS를 사용하면 쿠키 또한 암호화되어 전송되기 때문에, 제3자는 내용을 알 수 없게 됩니다.',
        totalLike: 5,
        reply: 2,
        authorNickname: '짱구',
        date: '2023.08.19',
        thumbnail:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLO_tjuE4ALxI2q72y-xzVg-4EPcv1-MECbgK_yhrBu5ekg2IGhWo4SQzweSAwUmW6zk4&usqp=CAU',
      },
      {
        id: 1,
        title: '프론트엔드에서 쉽게 HTTPS 적용하는 방법',
        body: '프론트엔드에서 HTTPS를 적용하는 방법에 대해 정리한 글입니다. 저는 프로젝트에서 Vercel을 사용하고 있는데요, Vercel을 이용해서 배포하는 경우 Vercel에서 자동으로 HTTPS를 ',
        totalLike: 4,
        reply: 0,
        authorNickname: '엘리',
        date: '2023.08.24',
        thumbnail:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZN3etXnA-oPONLOElfIlZifTaKB3USGT35g&usqp=CAU',
      },
    ],
  },
  {
    keyword: 'HTTP 상태코드',
    articleList: [
      {
        id: 0,
        title: 'HTTP 상태코드 알아보기',
        body: '크게 다섯 가지로 나뉘며, 각 분류별로 대표적인 상태 코드는 다음과 같다. 100~199: 정보성 상태코드 100(Continue): 요청의 시작 부분 일부가 받아들여졌음, 클라이언트는 계속 이어서 보내야 함',
        totalLike: 2,
        reply: 0,
        authorNickname: '짱구',
        date: '2023.08.19',
        thumbnail:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhsxXCnSiZb9bpmiNc72P5aUz-0nJG0v86vQ&usqp=CAU',
      },
      {
        id: 1,
        title: '500번대 에러가 발생하는 경우',
        body: '서버 자체에서 에러가 발생하는 경우 500번대 에러가 발생합니다. 또는 클라이언트가 서버의 제한에 걸렸거나 ,게이트웨이 리소스같은 서버의 보조 구성요소에서 발생한 에러일수도 있습니다. 프락시가 클라이언트의 입장에서 서버와 대화를 시도할 때, 에러가나면 프락시는 5XX 서버 에러 상태 코드를 생성합니다.',
        totalLike: 1,
        reply: 3,
        authorNickname: '엘리',
        date: '2023.08.22',
        thumbnail:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_1vlbBjz8NwavL1fTdSyCS4hKDq2XtcZBYA&usqp=CAU',
      },
    ],
  },
];

export const DragRelatedArticlesData = {
  page: 0,
  size: 10,
  articleList: [
    {
      id: 0,
      title: 'HTTPS란 무엇인가?',
      body: '텍스트 기반의 통신 규약으로 인터넷에서 데이터를 주고받을 수 있는 프로토콜이다. 이렇게 규약을 정해두었기 때문에 모든 프로그램이 이 규약에 맞춰 개발해서 서로 정보를 교환할 수 있게 되었다.',
      totalLike: 21,
      reply: 3,
      authorNickname: '유리',
      date: '2023.08.24',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPJyJHn6CSJoyS7QFbfPfbjMrxmav5bh_lOw&usqp=CAU',
    },
    {
      id: 2,
      title: 'HTTP와 HTTP의 차이점',
      body: 'HTTP: HTTP는 데이터를 암호화하지 않고 전송합니다. 따라서 민감한 정보(비밀번호, 개인정보 등)를 전송할 때 보안에 취약할 수 있습니다. 해커나 중간자 공격자가 데이터를 가로챌 수 있습니다.',
      totalLike: 8,
      reply: 0,
      authorNickname: '상원',
      date: '2023.08.18',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxOL0cORwHWnlq9cME7Gpe5wFi7tMVAu1IpQ&usqp=CAU',
    },
    {
      id: 3,
      title: 'HTTP 메서드: 웹 요청의 다양한 풍부함',
      body: 'HTTP 요청은 다양한 메서드를 사용하여 서버에 작업을 지시합니다. GET 메서드는 데이터를 조회할 때, POST 메서드는 데이터를 서버로 전송할 때 사용됩니다. PUT은 데이터를 갱신하고, DELETE는 데이터를 삭제할 때 활용됩니다. 각 메서드는 명확한 의미와 목적을 가지고 있어 웹 응용 프로그램의 기능을 구현하는 데 중요한 역할을 합니다.',
      totalLike: 2,
      reply: 1,
      authorNickname: '엘리',
      date: '2023.08.22',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsf038nMPz0I3L7vpryMov2Pb-gjK8kskByw&usqp=CAU',
    },
    {
      id: 4,
      title: 'HTTP 상태 코드의 의미와 활용',
      body: '서버는 클라이언트의 요청을 처리한 후, 성공, 리다이렉션, 클라이언트 오류, 서버 오류 등의 상태를 나타내는 3자리 숫자 HTTP 상태 코드를 응답으로 반환합니다. 예를 들어, 200 OK는 성공적인 요청을 나타내며, 404 Not Found는 요청한 리소스를 찾을 수 없음을 나타냅니다. 이를 통해 클라이언트는 요청의 결과를 파악할 수 있습니다.',
      totalLike: 20,
      reply: 3,
      authorNickname: '예림',
      date: '2023.08.11',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSnwzah9RQO0gi_BkCvfSXZMvgcIEyIO5k6A&usqp=CAU',
    },
    {
      id: 5,
      title: '더 알고 싶은 HTTP 헤더: 데이터 교환의 비밀스러운 조력자',
      body: 'HTTP 요청과 응답은 헤더라 불리는 부가적인 메타데이터를 포함합니다. 이 헤더는 클라이언트와 서버 간에 정보를 전달하고 확장 가능한 구조를 제공합니다. 예를 들어, 쿠키를 이용하여 사용자 상태를 유지하거나, 사용자 에이전트 정보를 전달할 수 있습니다. 이러한 헤더는 요청과 응답의 내용을 조정하고 보완하는 데 도움을 줍니다.',
      totalLike: 129,
      reply: 17,
      authorNickname: '춘식이',
      date: '2023.07.21',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtxBIN53KTlTEgb8e2ux3IcLSen8Enox1BWw&usqp=CAU',
    },
    {
      id: 6,
      title: '웹 성능 혁신, HTTP/2와 HTTP/3의 등장',
      body: 'HTTP/2는 기존의 HTTP/1.1을 대체하는 프로토콜로, 성능 개선을 위한 다양한 기능을 제공합니다. 이중화 기술을 통해 한 연결에서 여러 요청과 응답을 동시에 처리하여 웹 페이지 로딩 속도를 향상시킵니다. 반면, HTTP/3는 전송을 위해 TCP 대신에 UDP를 기반으로 하는 프로토콜입니다. 이는 빠른 데이터 전송과 연결의 안정성을 모두 확보할 수 있게 합니다. 둘 다 웹 통신의 효율성을',
      totalLike: 0,
      reply: 6,
      authorNickname: '짱구',
      date: '2023.06.29',
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcOoX2uFpH0uYmhVCnAi5JnvIgoPy6vsl8rguTsbhvvqtmhffp9E1fRzvLPcrfIWmJVqc&usqp=CAU',
    },
  ],
};
