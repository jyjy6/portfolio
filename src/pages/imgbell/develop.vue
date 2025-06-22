<script setup lang="ts">
  import type { ComponentPublicInstance } from 'vue';
  import { onBeforeUnmount } from 'vue';
  import { ref } from 'vue';
  import { nextTick } from 'vue';
  import { onMounted } from 'vue';

  const sections = [
    {
      id: 1,
      title: '1.사이트 첫 페이지',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/mainpage1.webp',
          comment: '메인페이지 시연영상',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/RecentViewCode.PNG',
          comment: '최근 본 목록 스프링코드',
        },
      ],
      description:
        '심플하다. 최근 업로드된 이미지들을 나열하고 페이지네이션, 로그인 시 최근 본 항목(TTL 7일)을 Redis로 저장하고 보여주는 기능을 구현했다.',
      isSpecial: false,
      specialStyle: {},
      imageRight: false,
    },
    {
      id: 2,
      title: '2. 로그인, 로그아웃, JWT검증, 회원기능',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/login1.webp',
          comment: '통상 회원가입 로그인',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/login2oauth.webp',
          comment: 'Google, Kakao Oauth 로그인',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/NewJWTFilter.PNG',
          comment:
            '새로워진 JWTFilter 코드. JWT토큰에서 유저정보추출, CustomUserDetail로 인증객체를 생성하고있다. 매 필터마다 DB조회 할 필요X',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/MemberRoleSet.PNG',
          comment:
            'Member테이블의 Role필드. 예를들어 SecurityConfig에서 admin이상의 권한인 superadmin 만 접근할 수 있게하는등.. 유연한 페이지 운영이 가능하다',
        },
      ],
      description:
        '기존 스프링 프로젝트에 비해 개선된 점이있다. 우선 accessToken, refreshToken의 발급과 저장방식은 똑같지만, JWT Filter에서 Authentication객체를 생성하는 부분이 바뀌었다.' +
        '\n\n 기존에는 loadUserByUsername함수를 통해 사용자 정보를 로드해서 Authentication 객체를 생성했었는데, 이 loadUserByUsername함수가 Spring Security내부에서 DB를 조회한다는 사실을 우연히 알게되었다. DB조회한다는건 JWT최대의 장점인 Stateless를 내다 버리는거고 그러면 세션이랑 별 다를게 없지않는가.. 라는생각으로 LLM모델이랑 상의해본 결과 같은 답변을 얻었고, 기존 JWT의 userInfo를 사용하여 CustomUserDetail으로 Authentication 객체를 만들어서 완전한 Stateless를 구현했다. 그 과정에서 Authentication 객체에 getId, getDisplayname 등의 추후 백엔드 API에서 사용할 유저정보도 뽑아낼 수 있게 구현하여 확장성 또한 고려했다.' +
        '\n\n OAuth 로그인은 이전 프로젝트랑 거의 다를게없다 그냥 라이브러리를 복붙해서 가져다 쓸 뿐. Kakao를 추가하면서 리다이렉트 페이지라던가 더 추가가 될까? 생각해봤으나 하나로 통일해서 토큰발급하는것도 가능했다. 결국 코딩에있어서 중요한건 언제나 큰그림, 작동방식을 이해하는거라고 생각한다 라이브러리 저런거 외워서 뭐하나 5초에 한번씩 바뀌는데...' +
        '\n\n 또 큰건 아니지만 이전과는다르게 Role을 여러개 가질 수 있게 Set을 활용했다(ROLE_ADMIN, ROLE_SUPERADMIN, ROLE_MEMBER) 이것으로 좀 더 유연하고 확장성 있는 회원역할 기능의 분리가 가능했다',
      isSpecial: false,
      specialStyle: {},
      spDescription: {
        image: [''],
        comment: '',
      },
      imageRight: false,
    },
    {
      id: 3,
      title: '3. 이미지 업로드, 검색, 노출',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/imageSearchMain.webp',
          comment:
            '이미지 검색기능1. 등급필터(일반, 성인, 특수)와 최신순, 좋아요, 인기순 검색 등 다양한 검색을 제공한다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/imageSearchByTag.webp',
          comment:
            '이미지 검색기능2. 태그를 클릭(검색)시 에도 이미지를 빠르게 찾아볼 수 있다. 최근검색은 레디스를 활용할까? 생각했지만 굳이 그럴필요가 없다고 판단하여 브라우저 로컬스토리지를 활용했다. ',
        },
      ],
      description:
        '사이트의 메인이라고 할 수 있는 이미지 업로드 기능이다. pixiv ~~booru 등의 해외 유명 사이트들을 참고해서 이미지 검색을 중심에 두고 구현했다. 예를들어 태그를 검색(클릭) 시 해당 태그를 갖고있는 모든 이미지를 리스트로 보여준다거나, 작가명, 업로더명, 이미지명 등의 검색속성을 지정하고 각 키워드를 검색하는 등의 로직을 생각하는데에 많이 신경을 썼다. ' +
        '\n\n 이러한 검색으로 사용할수있는 검색엔진은 QueryDSL, JPA Specification, Elastic Search등을 후보로 꼽았는데 이 프로젝트에선 JPA Specification을 활용했다. 이유는 스프링 내장기능으로 충분히 구현이 가능했다는 점이 가장컸다. QueryDSL ElasticSearch는 결국 라이브러리의 한 영역이고 위에 서술했다시피 이런건 자주바뀌기 때문에 버전문제등의 이유도 많이 일어난다. 그래서 우선 복잡한 Query를 조합해야 하는 검색기능의 근본적인 동작원리를 파악하기에는 JPA 내장기능으로도 충분히 가능하다고 생각했기 때문에 선택했다. 물론 현업에서 많이 사용한다는 QueryDSL, Elastic Search도 추후 추가할 의향은 있다.' +
        '\n\n 검색툴은 NavBar에 하나, 메인페이지를 시작으로 각 페이지에 컴포넌트로 하나 총 두개를 구현했는데, 이미지검색 사이트이기때문에 포럼, 마이페이지 등 어디서나 이미지검색을 할 수 있게 하기위한 UX가 좋겠다고 생각했기 때문이다. 이미지 상세 디테일에서도 태그들을 확인할 수 있는데 그 태그를 클릭해도 해당 태그 이미지 검색이 가능하다.',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: [
          'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/frontLoadImageFunction.PNG',
          'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/backendMyImageFunction.PNG',
        ],
        comment:
          '프론트, 백엔드의 이미지 로딩 함수. 여러 파라미터를 전송하여 해당 조건에 맞는 이미지들을 불러들인다.',
      },
      imageRight: false,
    },
    {
      id: 3.1,
      title: '3-1.JPA Specification',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/3-1+JPASpecification.PNG',
          comment:
            'ImageSpecification의 일부. root는 엔티티(여기선 Image)에 대한 참조, query는 전체 쿼리객체, cb는 CriteriaBuilder 조건을 생성하는 팩토리. WHERE AND OR같은 조건을 생성할때 사용',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/3-1+getImageListFunction.PNG',
          comment:
            '이미지 검색기능 함수의 일부. 마이페이지, 운영자일시의 if문, 검색타입(전체검색, 태그검색, 업로더명검색)등에 대한 case문이 보인다',
        },
      ],
      description:
        'Specification은 신선했다. 우선 Repository에서 인터페이스 두개 다중상속하는것도 처음봤고 @Query문도 거의 쓰는경우가 없었다. 근데 이 역시 만들어놓은사람이 이렇게쓰세요~ 하는 느낌의 라이브러리 감각이었기때문에 큰 의문은 없었다.' +
        '\n\n 처음 사용하는것이기 때문에 AI에게 hasTag hasGrade등 몇가지의 함수를 구현하게 했고 구조를 파악해서 hasUploaderName hasArtist등의 다른 함수는 내가 구현해보기도 했고 의도한대로 잘 작동했다. 이게 AI를 잘 활용하는 방법이라고 생각한다 특히 독학이라면. 그냥 AI에게 이거써주세요~ 하면 무슨 의미가 있겠나.. A문제 답안지를 보여줬으면 B문제 답안을 내가 내고 문제의 구조를 생각하면서 배우는걸 명심해야겠다',
      isSpecial: false,
      specialStyle: {},
      spDescription: {
        image: [''],
        comment: '',
      },
      imageRight: false,
    },
    {
      id: 4,
      title: '4. 마이페이지',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/MyPageCheck.webp',
          comment: '마이페이지 시연영상',
        },
      ],
      description:
        '마이페이지에선 기능적으로 크게 \n1.내가 업로드한 이미지 확인 \n2.내가 좋아요한 이미지 확인이 가능하다. 이 부분에서도 Jpa Specification을 작성하는데에 있어서 사용자 본인이 작성한 것 확인, 비공개or공개 이미지의 처리, 좋아요한 것 확인, 어드민일때의 경우, 악질유저가 타유저의 비공개된 이미지를 조회하려고 했을 때의 예외상황 고려, 각 탭을 클릭했을시의 이미지 목록 처리 등 마이페이지 기능자체는 단순하게 보이지만 여러 관점에서 생각할 수 있는 기회가 됐다.' +
        '\n\n 특히 쿼리파라미터로 마이페이지를 구분할 수 있는 간단한 개발방법이 있음에도 AI는 새로운 메서드를 만들어서 로직을 더 복잡하게 하려고 하는 허점을 보이기도 했는데, 역시 결국엔 AI도 사람이 "잘" 사용해야 빛을 보는거라고 생각되었다',
      isSpecial: false,
      specialStyle: {},
      spDescription: {
        image: [],
        comment: '',
      },
      imageRight: false,
    },
    {
      id: 5,
      title: '5.포럼 (게시판) 기능',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/useForum1.webp',
          comment: '게시판 글, 댓글 작성, 좋아요 기능 시연',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/forumSearch.webp',
          comment: '게시판 검색 ',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/forumComment.webp',
          comment: '댓글, 대댓글 작성',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/5-1+forumEntity.PNG',
          comment:
            'Forum의 Entity OneToMany와 cascade를 사용-> 글을 삭제하면 Many로 매핑된 친구들도 같이 삭제된다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/5-1+forumCommentEntity.PNG',
          comment:
            'ForumComment의 Entity. ManyToOne으로 Forum(게시글)과의 관계를 명시적으로 작성, 부모코멘트, 자식코멘트(대댓글)의 관계도 작성',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/5-1+forumFrontCommentCode.PNG',
          comment:
            '프론트의 댓글작성 함수. 대댓글의 경우 parentId 파라미터값을 넣어주면 OneToMany <-> ManyToOne 관계로 대댓글기능의 완성.',
        },
      ],
      description:
        '역사와 전통의 게시판기능. 이번엔 댓글과 대댓글 기능까지 포함한 완전한 커뮤니티 기능을 구현했다. 단순해보이지만 Entity 관계설정부터 프론트의 UI/UX까지 고려할 부분이 많았다.' +
        '\n\n Forum Entity에서는 OneToMany와 cascade를 사용해서 게시글이 삭제되면 관련된 댓글, 좋아요 등이 자동으로 삭제되도록 구현했다. ForumComment Entity에서는 ManyToOne으로 Forum과의 관계를 명시하고, 부모댓글-자식댓글(대댓글) 관계도 self-referencing으로 처리했다.' +
        '\n\n 프론트에서는 댓글 작성시 parentId 파라미터를 활용해서 일반댓글과 대댓글을 구분하여 처리했고, 실시간으로 댓글 목록이 업데이트되도록 구현했다. 게시판 검색 기능은 @Query 어노테이션을 사용한 네이티브 SQL로 구현했는데, 제목과 내용에서 키워드를 검색하고 대소문자 구분 없이 LIKE 검색이 가능하도록 했다. 당연히 Specification 기능도 사용할 수 있었지만 이미 한번 구현한 기능을 다른곳에 더 구현하는건 학습적으로 합리적이지 않다고 생각했다. 추후 QueryDSL이나 ElasticSearch도입도 고려해볼 수 있겠다.' +
        '\n\n 좋아요 기능은 서비스 로직에서 findByMemberAndForum으로 중복 체크를 하여 토글 방식으로 구현했고, 좋아요 여부에 따라 UI가 실시간으로 변경되도록 처리했다.' +
        '\n\n 게시판 기능 자체는 기본적이지만 엔티티 관계 설정과 프론트-백엔드 연동 부분에서 많은 것을 배울 수 있었다.',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: [
          'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/5-1+forumFolder.PNG',
        ],
        comment:
          '*폴더구조* Entity, Controller, Service, Dto 별로 폴더를 나누는 곳이 아직까지는 많은듯 한데 본인은 이 "기능별 폴더구조"가 상당히 효율적이라고 생각한다. 역할의분담, 폴더를 여러개 늘어놓지도 않아도 직관적으로 빠르게 필요한 클래스사용가능, 지금처럼 게시글, 좋아요, 댓글처럼 3개의 엔티티를 필요로 할 경우 관련된, 혹은 하위의 폴더들을 엮을 수 있기 때문이다.',
      },
      imageRight: false,
    },
    {
      id: 5.1,
      title:
        '5-1. Websocket을 활용한 댓글 실시간 알림기능 + Cursor 등 AI, MCP활용',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/8.WebSocketDemonstrate.webp',
          comment:
            '댓글 알림 기능 시연영상. 스마트폰으로 내 개발서버 들어와서 댓글을 달아보니 스낵바가 출력되고 클릭 시 해당 게시글 이동도 가능하다. 디자인은 다르지만 dcinside에서 보는 그거 처럼 구현.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/8WebSocketReady.PNG',
          comment:
            'Websocket 시험페이지. 댓글 알림 기능을 구현하기 전에 먼저 웹소켓 연결을 위한 시험 코드를 작성하고 연결해봤다. 시작부터 100을 내려고하기보단 1~2부터 시험해보는게 이해도, 기능구현도 더 빠르다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/8.WebSocketCursor.PNG',
          comment:
            '커서 사용. 기존에 시험페이지에서는 단순 String으로 알림을 받았는데, 커서를 사용해서 JSON형태로 변경 후 받은 데이터를 가공하여 해당 댓글이 달린 글목록 페이지로 이동하게 하는등 여러 기능을 구현했다.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/8WebSocketNotion.PNG',
          comment: '커서MCP를 사용해서 Notion에 배운내용 정리하라고 지시',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/8WebSocketNotionPageview.PNG',
          comment: 'Notion에 정상적으로 저장됐다.',
        },
      ],
      description:
        '댓글알림 기능도 구현했다. 처음엔 Redis와 WebSocket 둘 중 뭘로 구현할까 고민했는데 알림기능따윈 굳이 Redis에 저장까지해서 낭비할 필요가 없다고 판단했기에 WebSocket을 활용하기로 했다.' +
        '\n\n 예전 프로젝트에 실시간 기능을구현하면서 사용한 코드를 참고할까 싶었는데 0에서 시작하는게 더 실력향상에 도움될 것 같아서 그러지 않았다. 알림기능의 큰 흐름부터 생각하면 A유저의 게시물에 B유저가 댓글을 단다-> 댓글이 API를 통해 저장되면서 알림도 쏴준다-> A유저가 알림을 받는다 라는 큰 그림이라고 생각했고 AI에 그렇게 지시했다. 예전 프로젝트에서 하던 실시간 채팅의 코드와는 완전히 다른 코드를 구현했는데, 결국 프론트<->백엔드로 통신하는 큰그림만 이해하면 이런 라이브러리? 프레임워크? 는 사용법을 알고있는 AI에게 간단한것부터 구현하게하고 그 이후 내가 상세하게 지시하거나 코드수정을 통해 결과물을 냈다.' +
        '\n\n 처음엔 정말간단한 메세지만 받는방식 -> 서버와의 통신을확인 -> 잘되면 JSON등의 형식으로 바꿔서 받은 데이터를 프론트에서 가공하는방식.' +
        '\n\n 구현자체엔 큰 어려움은 없었지만 Cursor에서 구현해준 코드에서 확장성있다고 하는 Callback함수를 활용한 코드의 흐름을 이해하는데에 시간을 더 쓴 것 같다.' +
        '\n\n 학습이 끝나고 MCP를 활용하여 Notion에 정리하게 했다. 근데 이 MCP를 사용하는것도 상세하게 지시해야하는(예를들어 날짜지정해, XX데이터베이스 써 라던가)건 사람이라서 결국엔 세간에서 MCP MCP 호들갑 떨 정도는 "아직까지는" 아닌것 같았다.',
      isSpecial: false,
      specialStyle: {},
      spDescription: {
        image: [],
        comment: '',
      },
      imageRight: false,
    },
    {
      id: 5.2,
      title: '5-2. MCP 활용-> Google Keep 에서 Notion으로 데이터 이동',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/mcp1.PNG',
          comment: 'Google Takeout의 데이터들을 분석중인 모습',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/mcp4.PNG',
          comment:
            '이런 상세한거 빼먹고 자기 맘대로 날짜지정하고 이상한걸 자기 맘대로 하려고한다. 역시 사람이 지시해야한다 아직까진',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/mcp7.PNG',
          comment:
            '업로드성공 날짜는 역시나 지 마음대로 막 지정했지만 크게 중요하진않아서 추후 MCP로 Notion에 저장할때 날짜까지 꼭 지정하라고 지시내려야겠다.',
        },
      ],
      description:
        '이번 프로젝트랑 직접적인 상관은 없지만 MCP를 사용하기 시작했다. 딱히 쓸만한게 없고 Notion정도가 낫다고 생각해서 Google Keep에서 Notion으로 학습내역을 이전해봤다.' +
        '\n\n 먼저 Google Keep에 있는 데이터들을 Google Takeout으로 JSON파일로 변환하고 그걸 Cursor AI에게 제공-> MCP를 활용해서 Notion에 데이터베이스 형식으로 저장하게 했다. 근데 세상에서 호들갑 떠는것처럼 정교하진 않아서 상세지시같은거 하나하나 해야했고 Cursor의 MCP정책때문에 매번 run tool버튼도 눌러줘야했다. 아니 좋은건 알겠는데 완전 자동화는 아니잖아.. 유튜버들 자중들좀 했으면 한다' +
        '\n\n 어찌됐든 처음부터 끝까지 데이터 이전방법을 AI와 상담하고 필요한걸 내가 맞춰줘가면서 성공적으로 이동이 성공했고 더욱 더 가독성 좋은 학습내용 데이터베이스가 완성됐다. 만족한다 전체적으로',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: [
          'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/mcpgif.webp',
        ],
        comment: 'Cursor AI가 MCP를 활용해서 Notion으로 데이터가 채워지는 모습',
      },
      imageRight: false,
    },
    {
      id: 6,
      title: '6. 레디스 활용 -> 이미지랭킹, 최근 본 항목',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/6RedisRecentViewDemonstrate.webp',
          comment: '최근 본 항목 시연영상. 최근 본 이미지는 위로',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/6RedisRankingDemostrate.webp',
          comment:
            '랭킹기능 시연영상. 디파일러가 좋아요 점수 3점을 획득함으로써 일간, 주간랭킹 1위로 치고 올라왔다 👏👏👏',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/6RedisRecentView.PNG',
          comment:
            '최근 본 항목 구현 코드. incrementViewCount 함수는 DB에 조회수저장, Redis 캐시에 업데이트, 이미지 랭킹점수 업데이트를 동시에 행한다(Transactional 어노테이션 활용)',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/6RedisCacheLikeCount.PNG',
          comment:
            '레디스를 활용한 좋아요 숫자값 return함수 처음엔 DB에서 일일히 조회하는걸 AI가 놓쳐서 내가 의문을 제기하니까 맞는말하셨네요 죄송합니다! 라고 AI가 순순히 실수를 인정했다',
        },
      ],
      description:
        '웹개발에 있어서 처음 사용해보는 레디스. 우선 왜쓰는가? -> 1.캐싱으로 빠른 응답속도 2. DB의 부하를 줄이기 위해 사용 말고도 분산락 등 다양한 용도로 사용되는데, 이번 프로젝트에서는 이미지 랭킹, 최근 본 항목을 구현했다.' +
        '\n\n레디스의 큰구조 역시 Spring MVC의 Bean등록->사용. RedisConfig에서 환경설정(큰 프로젝트에선 대용량 트래픽을 위한 풀 설정 등)을 하고 RedisTemplate 에서 Bean으로 등록 후 사용하는 스프링 부트 역사와 전통의 패턴이었고 레디스 서버는 Docker로 간단하게 사용이 가능했다 정말 편리하다 도커.' +
        '\n\n우선 만들고싶은 기능을 구현하기 전에 레디스를 이해하고자 먼저 AI에 간단한 예시 Key Value값을 set, get 하는 템플릿을 만들어서 직접 사용해보고 내 현재 코드에 AI에 제공해서 Redis코드를 구현시켜봤는데 의도된 대로 작동했다. 하지만 역시나 AI가 내 프로젝트 전부를 확인하는 정밀함은 없어서 좋아요 숫자를 확인하는 메서드라던가 레디스의 장점인 DB를 사용하지 않아도 되는 기능의 추가는 내가 파악하고 추가하거나(AI에게 새로 지시하거나) 했어야 했다.' +
        '\n\n아무튼 최근본 게시글은 프론트+백엔드 둘 다 구현이 필요했고 프론트에서는 Redis에서 최근 본 게시글의 id값을 가져오고 백엔드로 이미지 상세정보를 요청하고 후처리로 최근 본 이미지를 앞으로 땡겨서 보여주는 등의 구현을 했다.' +
        '\n\n랭킹 기능의 경우 좋아요는 +3점 조회수는 +1점으로 랭킹점수를 계산하고 점수가 높은 순으로 정렬하여 보여주는 기능을 구현했다. 다운로드도 카운트에 포함할까 싶었지만.. 그냥 하지않았다 그냥 다운로드 우클릭해서 간단하게하고말지 굳이 다운로드 버튼 클릭하고 귀찮게하면 오히려 UX저해만 하는 것 같다..',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: [
          'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/6-1RedisRecentRefactoring.PNG',
        ],
        comment:
          '레디스 활용 리팩토링코드. 기존의 최근 본 목록은 Image의 id를 리스트로 모아서 -> 해당 id에 맞는 이미지들을 API요청 -> DB에서 리스트로 불러왔는데 / 레디스를 활용해서 API, DB조회를 스킵하고 다이렉트로 ImageURL을 레디스에 저장하고 그 URL을 직접 렌더링하는 방식으로 개선했다. 물론 기존에 저장하던 이미지 id도 어디에선가 사용할 수 있을것 같아서 JSON형식으로 Value를 저장했다.',
      },
      imageRight: false,
    },
    {
      id: 7,
      title: '7. 어드민 페이지 관리기능',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/7AdminDashboard.webp',
          comment:
            '대시보드 시연영상 이미지 디테일, 최근 작성된 게시판 글을 간단하게 확인',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/7AdminMemberlist.webp',
          comment:
            '유저 관리 시연영상. 검색어 입력후 0.5초 후에 자동으로 검색목록을 불러온다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/7AdminImageList.webp',
          comment: '이미지 관리 시연영상. 간단하게 공개->비공개로 변경',
        },
      ],
      description:
        '역시 역사와 전통의 운영자페이지. 간단하게 대시보드, 유저, 이미지관리 기능을 구현했다.' +
        '\n\n 대시보드는 간단하게 이미지 랭킹, 최근 작성된 게시판 글을 확인할 수 있다. 오늘 방문자는 일단 들어올 사람이 없어서 오늘 가입한 회원 수로 대체 테스트했다. 최초 이미지 기능을 만들 때 이미지 디테일 컴포넌트를 분리해놔서 재사용가능이 손쉬웠다. ' +
        '\n\n 유저 관리는 간단하게 검색어 입력후 0.5초 후에 자동으로 검색목록을 불러온다. 그렇다 NUXT프로젝트의 코드를 그대로 가져다썼다. 복붙 -> 좋은말로 재사용이야말로 개발의 시작이야 끝 아니겠나 하지만 Type수정과, 스프링 API는 새로 설계해야했기때문에 이 역시도 코드 재사용에 대해 학습할 수 있었다.' +
        '\n\n 이미지관리도 페이지네이션, 이미지 검색 툴을 재사용하는 등 효율적으로 구현했다. 영상에 보이는 기능상으론 공개/비공개 등의 변경을 하고있는데 명시적인삭제(isDelete = true 등)로 업로드한 유저에게도 안보이게 한다던가 여러가지 확장을 할 수 있을 것 같다.',
      isSpecial: false,
      specialStyle: {},
      spDescription: {
        image: ['/images/newfront.PNG'],
        comment: '프론트 뉴스더보기 코드.',
      },
      imageRight: false,
    },
    {
      id: 8,
      title: '8. AI(Google Gemini API)활용 이미지 분석, 태그 추가 기능',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/10.AIAnalyzationDemon1.webp',
          comment: '업로드에 새로이 추가된 AI분석기능 시연영상',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/10.AIAnalyzationDemon2.webp',
          comment: 'AI로 추가된 태그들도 정상적으로 태그검색이 가능하다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/10.AIAnalyzation5.PNG',
          comment:
            '바이브 코딩의 한 장면. 여기선 간단하게 원하는기능과 문제점을 서술하고있다. 결국 물리세계에서 체험은 인간이하고 AI에게 전달해야하는 것',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/10.AIService.PNG',
          comment:
            '프롬프트 엔지니어링. AI가 정확한 정보를 제공할 수 있게 5살짜리도 알아들을 수 있게 "설계"를 해야한다.',
        },
      ],
      description:
        '시작 전에, 우선 기능을 구현하면서 정말 많이 도움이 된 것 같다.\n\n 1. 요즘 Hot한 바이브코딩을 사용하고 코드와 기능구현방법을 내 것으로 만드는 법 \n 2. 요즘 Hot한 프롬프트 엔지니어링의 프로덕션 가능한 서비스 수준의 내용물 체험, \n 3. 백엔드에서의 Map 자료형의 중요성과 적극적 활용방법(특히 AI, API요청 에서의) 등등.. 본인은 기초를 쌓아놓은 후엔 완성된 결과물을 보고 내 것으로 만드는게 가장 큰 특기이기때문에 이런류의 코딩방법이 상당히 맞고, 그렇기에 앞으로 AI세대에서 AI활용을 잘할 수 있으리라는 자신이 더욱 붙은 것 같다.' +
        '\n\n\n 일단 요즘 말 많은 AI를 Google Gemini API를 활용하여 이미지 분석, 태그 추가 기능을 구현했다. 이미지를 업로드하고 AI분석 버튼을 누르면 Gemini가 해당 이미지를 분석하고 태그를 10개가량 추천, 이미지의 퀄리티에따라 등급도 매겨준다. 기능 얘기는 여기까지다 개발자로써 이런 기능이 있다~ 보단 뭘 배웠냐가 더 중요한것 같다' +
        '\n\n 프론트에서는 우선 간단하게 Cursor AI에게 지시를 내려서 이미지 분석 하는 컴포넌트를 만들게했고 그걸 각 업로드한 이미지마다 적용했다. 하지만 기존에 createURL메서드를 사용했는데, Gemini는 이 URL을 읽을 수 없기때문에 직접 file을 백엔드로 전송했고 백엔드에서는 bytes값을 따고-> base64로 인코딩해서-> Gemini에게 전달하는 방법으로 구현했다. 누가? Cursor AI가. 나는 제미나이가 URL을 뭐 무슨 정책제약이나, 브라우저전용 URL의 한계 등의 문제로 URL을 읽을수 없다는걸 눈치채고 그에 따른 솔루션을 요청했다. \n\n 이와같이 기존에 파일을 바이트로 변환하고 base64로 인코딩하는 등의 지식은 내게 없었다. 그렇기에 문제점을 발견하고 AI의 방대한 해결방법을 내가 다시 받아먹어서 내 피와 살로 만드는게 이 바이브코딩의 핵심이라고 생각한다.' +
        '\n\n 백엔드에서는 의존성추가+컨트롤러+서비스+DTO등의 작성은 생략해도 정말 여러가지를 배웠다.' +
        '\n 1. 프롬프트 엔지니어링. 요새 자주보이는 외모평가, 음악찾기 등의 AI서비스가 이런식으로 만들어진다는것을 알게되었다. 결과물을 받을 DTO를 지정해놓고, 그에맞는 폼에 AI에게 요청할 글을 내가 텍스트로 길게 작성해놓고 요청받는다. 이게 큰 틀인데 그냥 이거 "해줘"가 아닌 5살짜리도 알아들 수 있고 틀에 맞춰진 정형화된 질문을 설계하는게 중요하다고 느꼈다. \n 느낀바로는 이 프롬프트 엔지니어링이라는건 사실 추후 GUI로써 클라이언트들이 직접 쓰는경우가 더 많아질 것 같기떄문에 개발자의 필수소양은 되지 않게 되더라도 마치 SQL문을 효율좋게 작성하듯이 토큰의 절약, 더 빠른응답, 상세한 결과반환 등을 기대한다면 개발자로서의 스킬로 충분히 작용할 수 있다고 생각했다.' +
        '\n\n 2. Map자료형 적극사용. 바이브코딩으로 서비스를 확인해보니 죄다 @Data에 Map을사용하는 경우가 많았다. 생성옵션을 설정할때도 Map<String, Object> generationConfig = new HashMap<>(); 이렇게 선언해놓고 put메서드를 사용하고, objectMapper로 직렬화, 역직렬화 할 때에도 사용하고 백엔드에선 List자료형보다 더 많이 사용하는걸 새삼 깨닫게 되었고, 완전히 유연하게 사용하기위에선 더 많은 경험과 사용해야겠다는 내 스스로의 "인식"이 더 필요할 것이라고 느꼈다. ' +
        '\n\n 이외에도 자바판 Async/Await인 Mono/Block, AI들이 제공하는 응답에 대해서 백엔드 코드를 맞춰야 한다는 것 등, 많은걸 배울 수 있었다. ',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: [
          'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/10.AIController.PNG',
        ],
        comment:
          '백엔드 컨트롤러 코드. 사실 Swagger도 이전에 도입했는데 프로젝트에는 굳이 서술하지 않을예정이다. 사용법도 별 거 없고 그냥 AI시키면 뚝딱 뿅~ 이기에.. 문서화로 인한 개발자 혹은 클라이언트간의 소통 개선.. 도있지만 사실 백엔드 코드보면 더 복잡해지는 단점도 있는 듯 하다.',
      },
      imageRight: false,
    },
    {
      id: 8.1,
      title:
        '8-1. AI(Google Gemini API)활용한 검은수염 마샬 D.티치(40세, 현역 사황)의 이미지 분석',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/10-1.CharDemo2.webp',
          comment:
            '검은수염 마샬 D.티치의 이미지 분석 시연. 이미지 파일 혹은 이미지 URL을 입력하면 원피스의 캐릭터 마샬 D.티치(검은수염)가 이미지를 분석해준다. 본인 사진이 맘에드는건지 안드는건지 모르겠다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/10-1.CharDemo.webp',
          comment:
            '검은수염 마샬 D.티치의 이미지 분석 시연2. 최대의 라이벌 붉은머리 샹크스에 대한 말. 뭔가 헛소리하시는 것 같기도 하고 40세 답지 않은 중학생스러움이 매력적이다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/10-1.CharController.PNG',
          comment:
            '컨트롤러에 새로 추가된 코드(상세 GITHUB 백엔드 ImageController참조) 기존에 쓰던 이미지 분석 컨트롤러에서 함수만 살짝 바꿨다 이런식으로 Gemini등 프롬프트활용 API는 약간의 수정으로도 여러 컨텐츠를 만들어낼 수 있다.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/10-1.CharDTO.PNG',
          comment:
            'DTO도 기존의 것을 내가 원하는 데이터로 수정해서 Gemini에게 전달하고 전달 받는다. 서비스 역시 동일.',
        },
      ],
      description:
        'Google Gemini API를 응용한 두번째 기능. 프롬프트 엔지니어링을 더 응용할 수 있을거같아 뚝딱 만들어봤다. 물론 이번엔 AI의 도움이 없이 내 손으로 기존 백엔드 코드를 수정해서 구현했다. 안그러면 이해는 하지않고 진짜 복붙만하는 허수아비가 될 뿐이다.' +
        '\n\n 뭘 할 수 있을까 생각해본결과 예전에 유튜브에서본 싸가지없는 채팅봇 같은게 떠올랐다. 그래서 난 이번엔 만화캐릭터가 이미지를 분석해주면 재밌지 않을까? 라는생각이 들어서 원피스의 가장 개성있는 캐릭터 검은수염 컨셉으로 Gemini에게 응답을 해달라고 프롬프트 요청을하고, 기존 코드에서 사용한 컨트롤러, 서비스, DTO를 바탕으로 내가원하는 기능에 맞게 수정해서 구현했다. ' +
        '\n\n 이런식으로 AI 프롬프트를 활용한 기능은 정말간단하게 구현할 수 있다. 예를들어 맞춤법 교정앱, 영어 학습앱 등등.. 문제는 AI의 성능과 앞서 서술했듯 얼마나 토큰을 절약하고 효율좋은 구조를 만들어내냐가 중요한 것 같다. ',
      isSpecial: false,
      specialStyle: {},
      spDescription: {
        image: [''],
        comment: '',
      },
      imageRight: false,
    },
    {
      id: 9,
      title: '9. 테스트 코드',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/11.SpringTestCode.PNG',
          comment:
            '테스트코드 샘플. "닉네임 중복에 대한 테스트코드" when의 thenReturn값을 바꾸면 아래의 테스트 실패가 발생한다.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/11.SpringTestCodeFailed.PNG',
          comment:
            '테스트 실패1. when(memberRepository.existsByUsername("user123")).thenReturn(true); 로 실험(중복 아이디가 있어서 닉네임 검사 전에 바로 에러) 그 아래의 when코드가 실행되지 않기때문에 컴퓨터가 ??니 발동안하는 코드 있음 테스트실패 ㅅㄱ 라고 알려준다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/11.SpringTestCodeFailed2.PNG',
          comment:
            '테스트 실패2. 이번엔 when(memberRepository.existsByDisplayName("nickname")).thenReturn(false); 로 했을 시(중복 닉네임이 없을시) 에러가 나질 않으니까 컴퓨터가 ??에러 안나는데? 너 테스트실패함 이라고 알려준다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/11.SpringTestPassed.PNG',
          comment:
            '모든 단위 테스트 성공. 이렇게 테스트코드를 작성해놓으면 추후 여기서 사용했던 로직이 변경되어서 테스트가 실패되고 바로 디버깅->수정이 가능하다. 모든것이 자동화 되어 종합적으로 비용이 더 절약된다',
        },
      ],
      description:
        '개발 시작한지 얼마 되지 않았을때에 테스트코드의 존재를 알았다. 근데 한가지 의문이들었다. "테스트코드를 작성할바에 그냥 다른코드 하나 더쓰지 이게 무슨의미가있는거지? 그냥 로컬에서 코드실행 잘되면 그게 테스트 아닌가?"\n' +
        '\n지금 생각해보면 참 단순한 아가시절 사고방식이다. 예를들어 기능A를 만들었고 작동 잘 되는거 확인했는데, 그 기능A에서 사용한 함수가 나중에 변경되어서 프로덕션 환경에서 실행이 안되면..? -> 디버깅도 힘들고 찾는데 쓰는 비용이 훨씬 더 많이 나올 것이다. 하지만 약간의 시간을 더 들여서 테스트코드를 작성한다면 테스트 실행 시 디버그도 빠르게 할 수 있고 그 비용은 훨씬 절감되는 효과를 볼 수 있다. ' +
        '\n\n 본인은 우선 JUnit Mockito 등을 사용한 단위테스와, @DataJpaTest를 사용한 슬라이스 테스트까지가 제일 ROI가 좋다고 생각했고 그부분을 학습했다. 통합테스트(@SpringBootTest)는 SpringSecurity, 다른 외부서비스(oauth, s3등)등의 연계들이 더 복잡하게 얽혀있어서 낭비가 너무 심했고 현 시점의 AI도 코드작성을 잘 하지 못하는 모습을 보였다. 프론트에선 vitest jest등의 라이브러리를 설치해야하며 솔직히 재사용하는 컴포넌트, UI, 매우 복잡한 계산로직 이외의 코드들은 백엔드만큼의 테스트의 중요성과 ROI를 느끼지 못했기 때문에 우선 백엔드 단위+슬라이스 테스트에 집중하기로 했다.' +
        '\n\n 우선 평소와도 같이 테스트코드도 처음 작성하는거라 AI의 힘을 많이빌렸다. 이 프로젝트에서 가장 중요한 핵심로직인 ImageService코드를 몇 개 작성시키고, 테스트코드에 작성돼있는 Assert @Mock @InjectMock verify등의 함수, 어노테이션을 학습하고 TAD(Test-After Development)방식과 given when then 규칙을 지키며 테스트코드를 작성했다.' +
        ' 근데 하다보며 느낀게 이 단위테스트 같은거야말로 AI의 최대장점을 발휘할 수 있는 영역이 아닌가 싶다. 이미 작성되어있는 로직을 분리해서 테스트코드를 만드는, 예를 들자면 조립되어있는 레고랑 똑같은 파츠 사용해서 똑같이 조립이 되는지 맞추는.. 이거야말로 기계가 가장 잘하는 게 아닐까 싶다. 그럼에도 사람의 힘이 필요한 의도를 생각해보면 \n\n 1. 이 로직이 물리세계에서 왜 필요한지의 의도까지는 사람만이 파악할 수 있다는점 \n2. AI는 이미 만들어진 코드를 바탕으로 테스트를 작성하므로 "정상흐름"에 대한 테스트코드는 잘 작성하지만, "예외상황"에서는 소홀해질 수 있다는점 \n3.옛날버전의 JUnit mockito 를 사용해서 학습된경우가 많아서 어노테이션, 함수사용을 잘못하는점. \n등이 있다는걸 알게되었다. 즉 로직 이해와 테스트의 명확성은 언제나 사람이 보완점을 생각해야 한다고 느꼈고, 테스트코드를 자주 작성해서 몸에 배게하는것이 중요하다고 생각한다.',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        comment:
          'TDD(Test-Driven Development)방식은 5천만번 생각하고 AI와의 대화를해봐도 너무 현실적으로 와닿지 않았다.. 전체 구조도 안잡혀있고 로직도 안쓰여있는데 테스트먼저라는게 너무 허공에 페달밟는 느낌이 들었고 현업에선 개발시간도 정해져있을텐데 테스트먼저짜고 기능을개발?.. 현재의 본인으로썬 너무 이상적이라고만 생각된다',
      },
      imageRight: false,
    },
    // {
    //   id: 8,
    //   title: '8. 배포 AWS EC2, Docker',
    //   images: [
    //     {
    //       image: '/images/deploy/docker-file.PNG',
    //       comment: '프론트 도커 파일예시',
    //     },
    //     {
    //       image: '/images/deploy/docker-compose.PNG',
    //       comment: 'docker-compose.yml',
    //     },
    //     {
    //       image: '/images/deploy/EC2-4files.PNG',
    //       comment: 'https를 위한 pem파일, 도커파일 등',
    //     },
    //     { image: '/images/deploy/EC2-2.PNG', comment: 'EC2인스턴스에 연결' },
    //     {
    //       image: '/images/deploy/EC2-3Docker.PNG',
    //       comment: 'git clone으로 생성된 폴더목록과 docker-compose실행.',
    //     },
    //   ],
    //   description:
    //     '내 집 컴퓨터를 24시간 켜놔도 좋겠지만 편리하게 AWS EC2 프리티어를 사용해서 배포하자. \n',
    //   isSpecial: true,
    //   specialStyle: {},
    //   spDescription: {
    //     image: [],
    //     comment:
    //       '사실 지금보고계신 이 웹페이지가 Github Action+EC2 조합으로 배포됨.',
    //   },
    //   imageRight: false,
    // },
  ];

  // 현재 활성화된 섹션 ID
  const activeSection = ref<number | null>(null);

  // 섹션으로 스크롤 이동하는 함수
  const scrollToSection = (sectionId: number) => {
    const el = sectionRefs.value[sectionId];
    const domElement = el instanceof HTMLElement ? el : (el as any)?.$el;

    if (domElement) {
      // 부드러운 스크롤 효과
      domElement.scrollIntoView({ behavior: 'smooth' });
      activeSection.value = sectionId;
    }
  };

  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ인터섹션옵저버ㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  type DOMElement = Element | ComponentPublicInstance | null;

  // 반응형 상태 정의
  const visibleSections = ref<number[]>([]);
  const sectionRefs = ref<Record<number, DOMElement>>({});
  const observers = ref<IntersectionObserver[]>([]);

  // Intersection Observer 설정 함수
  const setupIntersectionObservers = () => {
    // 기존 옵저버 정리
    observers.value.forEach((observer) => observer.disconnect());
    observers.value = [];

    // 각 섹션에 대한 새 옵저버 생성
    sections.forEach((section) => {
      const el = sectionRefs.value[section.id];
      // 요소 또는 컴포넌트에서 실제 DOM 요소 가져오기
      const domElement = el instanceof HTMLElement ? el : (el as any)?.$el;

      if (!domElement) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // 화면에 보이면 visibleSections에 ID 추가
              if (!visibleSections.value.includes(section.id)) {
                visibleSections.value.push(section.id);
              }
              // 한 번 나타나면 관찰 중지 (선택사항)
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1, // 10% 이상 보이면 트리거
          rootMargin: '0px 0px -10% 0px', // 화면 하단 10% 지점에서 트리거
        }
      );

      observer.observe(domElement);
      observers.value.push(observer);
    });
  };

  // 컴포넌트 마운트 시 옵저버 설정
  onMounted(() => {
    nextTick(() => {
      setupIntersectionObservers();
    });
  });

  // 컴포넌트 언마운트 시 옵저버 해제
  onBeforeUnmount(() => {
    (observers as any).value.forEach((observer: any) => observer.disconnect());
  });
</script>

<template>
  <v-container class="pa-10">
    <h1 class="text-center mb-10">
      <v-icon icon="mdi-vuejs" class="mr-2" size="x-large"></v-icon>
      <v-icon icon="mdi-leaf" class="mr-2" size="x-large"></v-icon>
      ImgBell Project DevelopmentLog
    </h1>

    <!-- 나무위키 스타일의 섹션 목록 -->
    <v-card class="mb-8 wiki-toc" dark>
      <v-card-title
        class="text-center pb-2"
        style="
          color: #90caf9;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        "
      >
        <v-icon left color="#64B5F6" class="mr-2"
          >mdi-format-list-bulleted</v-icon
        >
        목차
      </v-card-title>
      <v-card-text class="py-2">
        <ul class="toc-list">
          <li v-for="section in sections" :key="section.id" class="toc-item">
            <a
              href="#"
              @click.prevent="scrollToSection(section.id)"
              :class="{ 'active-section': activeSection === section.id }"
            >
              <v-icon small class="mr-2" color="#64B5F6"
                >mdi-chevron-right</v-icon
              >
              {{ section.title }}
            </a>
          </li>
        </ul>
      </v-card-text>
    </v-card>

    <!-- v-for를 사용한 반복 렌더링 -->
    <v-row
      v-for="section in sections"
      :key="section.id"
      class="d-flex justify-center my-6 position-relative fade-section"
      style="text-align: center"
      :class="{ visible: visibleSections.includes(section.id) }"
      :ref="
        (el) => {
          if (el) sectionRefs[section.id] = el;
        }
      "
    >
      <template v-if="!section.imageRight">
        <!-- 왼쪽 컬럼 (이미지) -->
        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column align-center justify-center"
        >
          <v-alert type="success" variant="outlined" class="mb-2">{{
            section.title
          }}</v-alert>
          <div v-for="(image, i) in section.images" :key="i">
            <img
              :src="image.image"
              :alt="`image-${section.id}`"
              style="max-width: 100%; max-height: 450px; object-fit: contain"
            />
            <p style="margin-bottom: 20px">{{ image.comment }}</p>
          </div>
        </v-col>

        <!-- 오른쪽 컬럼 (설명) - 스티키 적용 -->
        <v-col cols="12" md="6">
          <v-card
            class="pa-10 text-left description-card"
            :class="section.isSpecial ? 'special-card' : ''"
            style="position: sticky; top: 150px"
          >
            {{ section.description }}
          </v-card>
        </v-col>
      </template>

      <template v-else>
        <!-- 왼쪽 컬럼 (설명) -->
        <v-col cols="12" md="6">
          <v-card
            class="pa-4 description-card"
            :class="section.isSpecial ? 'special-card' : ''"
            style="position: sticky; top: 150px"
          >
            {{ section.description }}
          </v-card>
        </v-col>

        <!-- 오른쪽 컬럼 (이미지) -->
        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column align-center justify-center"
        >
          <v-alert type="info">{{ section.title }}</v-alert>
          <!-- v-bind 없이 직접 이미지 경로 사용 -->
          <div v-for="(image, i) in section.images" :key="i">
            <img
              :src="image.image"
              :alt="`image-${section.id}`"
              style="max-width: 100%; height: 550px; object-fit: contain"
            />
            <p>{{ image.comment }}</p>
          </div>
        </v-col>
      </template>

      <!-- 특별한 섹션에만 추가되는 컨텐츠 -->
      <v-col v-if="section.isSpecial" cols="12" class="mt-4">
        <img
          v-for="spImg in section.spDescription?.image"
          :src="spImg"
          :alt="`image-${section.id}`"
          style="max-width: 100%; height: auto; object-fit: contain"
        />
        <v-alert
          type="info"
          variant="tonal"
          style="white-space: pre-line !important"
          v-if="section.spDescription?.comment"
        >
          {{ section.spDescription?.comment }}
        </v-alert>
      </v-col>
      <hr style="width: 100%; margin: 16px auto; border: 1px solid white" />
    </v-row>
  </v-container>
</template>

<style scoped>
  .description-card {
    white-space: pre-line !important;
  }
  .fade-section {
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 1.2s ease,
      transform 1.2s ease;
  }

  .fade-section.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* 나무위키 스타일의 목차 - 다크 모드 */
  .wiki-toc {
    background-color: rgba(30, 30, 30, 0.8);
    border-radius: 8px;
    margin-bottom: 30px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .toc-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .toc-item {
    padding: 8px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .toc-item:last-child {
    border-bottom: none;
  }

  .toc-item a {
    color: #64b5f6; /* 더 밝은 파란색 */
    text-decoration: none;
    display: block;
    transition: all 0.2s ease;
  }

  .toc-item a:hover {
    color: #90caf9;
    background-color: rgba(33, 150, 243, 0.2);
    border-radius: 4px;
    padding-left: 8px;
  }

  .active-section {
    font-weight: bold;
    color: #90caf9 !important;
    background-color: rgba(33, 150, 243, 0.25);
    border-radius: 4px;
    padding-left: 8px;
  }
</style>
