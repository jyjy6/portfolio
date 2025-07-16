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
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/0000ImgBellHomePage.webp',
          comment: '메인페이지 시연영상 엘라스틱 자동완성, UI개선판',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/mainpage1.webp',
          comment: '메인페이지 시연영상(프로토타입)',
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
        '\n\n 또 큰건 아니지만 이전과는다르게 Role을 여러개 가질 수 있게 Set을 활용했다(ROLE_ADMIN, ROLE_SUPERADMIN, ROLE_MEMBER) 이것으로 좀 더 유연하고 확장성 있는 회원역할 기능의 분리가 가능했다\n\n' +
        '메인 페이지는 Vuetify를 활용한 현대 모던웹페이지 디자인, 엘라스틱서치를 활용한 자동완성기능, 검색을 구현했다. 검색시 이미지 그리드로 자동 스크롤.',
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
      id: 3.2,
      title: '3-1.Elastic Search',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/12.ElasticSearchTest1.webp',
          comment:
            '엘라스틱서치 테스트 페이지. DB에서 ES인덱스 동기화, 검색이 잘되는지 등을 시험하고있다.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/12.ElasticSearchTest2.webp',
          comment:
            '엘라스틱서치 테스트2. 인기이미지, 최신이미지, 자동완성등을 행하고있다.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/12.ElasticSearchMySuggestion.PNG',
          comment:
            'AI가 이상한 제안만해서 사람이 수정하는모습. 역시 실제 비즈니스의도를 "왜","어디에" 써야하는지까지는 AI도 모르기때문에 의도를 확실히 전달해야한다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/12.ElasticSearchInAdmin.webp',
          comment:
            '위의 AI의 이상한 제안에서 수정한대로 작동하는 모습. 테스트 페이지와는 다르게 검색과 자동완성이 통일되었다. 이미지 디테일 컴포넌트도 깔끔하게 재사용 잘 되는 모습',
        },
      ],
      description:
        '저번 JPA Specification에서 말한대로 ElasticSearch 추가했다.\n\n' +
        '처음엔 ELK 스택 전체를 공부하려고 전부 도커로 서버띄워서 실행도해봤는데 사용이유와 의도는 알겠지만 아직까지 내 단계에서 ELK스택 모두를 배우는건 ROI가 너무 안나오고 무엇보다 이건 DevOps의 영역이라는 느낌이 많이 들었다. 넓게파는건 좋지만 얕으면 접싯물밖에 되지않기에 ElasticSearch로 검색엔진만을 구현하기로했다 추후 Kafka를 통한 학습확장성까지 생각할 수 있기때문이다.' +
        '\n\n 우선 엘라스틱서치에 대해 가볍게 이론으로 이해부터 하고 들어갔다 강력한 검색기능을 제공하며 DB와는 별도로 독립된 인덱스라는 테이블/컬렉션과 유사한 개념을 사용하는 외부서비스이다.' +
        '\n 단점으로써는 DB와는 별도로 훨씬 더 많은 메모리와 디스크 사용량이 크고, 단순 라이브러리가아닌 서버 기반서비스 이기때문에 운영에 대한 추가적인 관리가 필요하는 등 도입하기전 고려해야할 점도 많다.' +
        '\n\n 구현하는데에 있어서의 큰 설계는 \n1. 기존 DB에 있는 데이터들을 ES 인덱스에 동기화, \n2.기존 서비스로직에서 연동하는 로직도 추가, \n3.엘라스틱서치 검색을 위한 별도의 서비스로직 추가.\n' +
        '이정도가 필요했다. 우선 이 프로젝트의 핵심인 Image테이블에 ES를 도입하고자 Image디렉토리 하위에 ElasticSearch디렉토리와 Document(RDBMS의 테이블과 비슷한개념),Controller,Repository,Service 등을 생성했다.' +
        '\n\n엘라스틱 서버는 위대한 Docker신의 힘을 빌려서 띄웠고 Volume으로 내 로컬 디렉토리를 설정하여 인덱스, 문서 등을 저장했다.(데이터 휘발 방지) ' +
        '\n\n 처음써보는 것이라 역시 이전에 하던대로 테스트페이지를 만들고 AI에게 간단한 시험코드를 제작하게하고 사용해서 큰동작원리를 이해하고, 내 프론트 컴포넌트에 점진적으로 적용하는식으로 구현했다. ' +
        '\n\n 간단하게 정리하자면 테스트페이지 정상작동-> 기존 프로젝트에 어떻게 활용할지 설계 -> 컴포넌트에 레고 부품 붙이듯 추가.' +
        '\n\n 처음써보는 기능을 가장 빠르고 효율적으로 이해하는방법이라고 생각한다.' +
        '\n\n 디테일하겐 withQuery bool should 등 처음보는 ES제공함수들이 있었기에 AI에게 주석으로 설명을 요구하고 그걸 이해하는식으로 학습했다. 이런 함수들은 무엇이든간에 외우는게아니고 동작원리와 이런게 있다 라는걸 뇌리에 각인시키면, 나머지는 반복과 경험을 통해 필요한 곳, 사용할 곳이 떠오르는 노하우가 자연스레 쌓여지게 된다.' +
        '',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: [
          'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/12.ElasticSearchSmartSearchCode.PNG',
        ],
        comment:
          '엘라스틱서치 또한 Redis때와 같이 기본으로 제공하는 함수가있고 그 예제를 AI게 쓰게하거나 주석으로 설명하게 한 후 내가 코드를 읽어서 해석하고 내것으로 만드는식으로 활용했다. 마치 20년차의 개발자의 완성물을 순식간에 내것으로 만드는것과 같다',
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
      id: 6.1,
      title:
        '6-1. 레디스 활용 심화 -> 분산락(Distributed Lock)을 활용한 좋아요 중복방지, 기존코드 Forum서비스 까지의 확장',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/16.Redis-NewTopRanking.jpg',
          comment:
            'GetTopImages 메서드 리팩토링 스크린샷. String table 파라미터를 추가했고 이후 Image Forum이외에도 랭킹이 필요한 곳에 더 편리하게 사용할 수 있게 확장하였다.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/16.Redis-ForumRankingDemo.webp',
          comment:
            'Forum 랭킹 시연영상. 조회는 1점 좋아요는 3점으로 Image때와 같이 TTL설정도 잘 되어있다.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/16.Redis-DistributedMethod.jpg',
          comment:
            '분산락 편의 메서드. executeWithLock이 오버로딩되어 두개있는데 하나는 return값이 없는 것, 하나는 리턴값이 있을때 어떤 타입이 들어올지 모를때 사용하는 제네릭 문법을 이용한 코드. Github참조.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/16.Redis-DistributedLockDemo.webp',
          comment:
            '좋아요 중복 시연영상. 테스트라 5초의 텀을 지정해놓고 시험해보니 중복좋아요 방지가 잘 기능하고있다. GlobalException으로 프론트에서도 무슨에러인지 잘 확인가능.',
        },
      ],
      description:
        '우선 레디스 확장성을 시험해보기위에 기존에있던 RankingService의 코드를 재활용했다. \n기존에 getTopImages메서드로 일간, 주간 "이미지" 상위랭킹을 실시간으로 구현했는데, 똑같이 "포럼(게시판)"에도 적용할 수 있을 것 같았고, 기존의 메서드에 String table 이라는 파라미터를 추가해서 Image에서 활용하는 것 인지, Forum에서 활용하는 것 인지 구분 후 추가로직을 설계했고 의도대로 잘 구현되었다.\n\n' +
        '두번재는 분산락을 활용한 중복 좋아요 방지를 구현했다.-> 즉 데이터 일관성, 동시성 문제 해결을 했다. Redis의 SETNX(Redis의 키가 없을때만 설정하는 연산), Lua 스크립트 등 처음써보는 Redis의 기능들이 있어서 신선했다. ' +
        '레디스를 조금 더 깊게 팜에 있어서 opsForValue, opsForZSet 등 다양한 레디스 제공함수들이 있다는걸 더욱 깊게 알게되었고 이를 모두 외울수는 없지만 이 역시 어떻게 활용하는지 파악하는게 중요하고 반복된 실전을 통해 몸에 각인시키는게 포인트라고 생각됐다. \n\n 이제 레디스는 Pub/Sub(이 프로젝트에선 실시간 알림을 WebSocket으로 구현)을 통한 실시간알림, Cluster를활용한 샤딩, API레이트 리미팅 등의 여러가지 활용 방법이 있는데 이 또한 개발을 진행하면서 더욱 깊게 학습할 예정이다.',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: [
          'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/16.Redis-RateLimiting.jpg',
        ],
        comment:
          'API RateLimiting도 구현했다. ......사실 nginx만으로도 충분할 것 같은 느낌이 들어서 별도로 항목을 개설하진 않았지만 커스텀 어노테이션, 3가지의 RateLimiting 방식, 인터셉터 등록 등 단계별 설정과 상황별 방식사용등 구조와 기능 흐름자체를 이해하는데에 큰 공부가 되었다. 코드는 AI가 짜고 기능까지 만들었지만 결국 "흐름"을 이해해야하는게 개발자인 것 같고 요새 개발자는 코더가아닌 설계자가 되어가는 느낌이 강한 것 같다..',
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
            '테스트 실패1. when(memberRepository\n.existsByUsername("user123"))\n.thenReturn(true); 로 실험(중복 아이디가 있어서 닉네임 검사 전에 바로 에러) 그 아래의 when코드가 실행되지 않기때문에 컴퓨터가 ??니 발동안하는 코드 있음 테스트실패 ㅅㄱ 라고 알려준다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/11.SpringTestCodeFailed2.PNG',
          comment:
            '테스트 실패2. 이번엔 when(memberRepository\n.existsByDisplayName("nickname"))\n.thenReturn(false); 로 했을 시(중복 닉네임이 없을시) 에러가 나질 않으니까 컴퓨터가 ??에러 안나는데? 너 테스트실패함 이라고 알려준다',
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
    {
      id: 10,
      title: '10. 배포 AWS EC2, Docker, Github Actions (CI/CD 자동화)',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/13.Deploy-RedisError.PNG',
          comment:
            '배포 전 도커환경 테스트에서의 Redis 서버 구동 오류. Production으로 바뀌었을때 포트설정 등의 오류가 있었다. 개발 초창기의 배포시 보다는 적극적으로 application-prod 파일 등을 적극적으로 써서 그나마 덜했으나 가끔 이런류의 예기치 못한 상황도 나오곤 한다. 이런 예기치 못한 오류가 있기 때문에 바이브코딩 등으론 한계가있다고 생각한다. 내가 찾아내기 전까지 AI는 다른거 고치라고 조잘 조잘..',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/13.DeployDocker.PNG',
          comment: '로컬에서 확인한 도커환경 구동화면. 모드 정상작동한다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/13.Deploy-totalModified.PNG',
          comment:
            '내가 배포할 방법을 설명하고 yml파일 작성을 요구하고있다. 하지만..',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/13.Deploy-ymlTrue.jpg',
          comment:
            'AI는 내가 docker compose를 사용하리라곤 생각 못했는지 tar파일을 만들고 도커이미지 직접 생성하고 포트지정까지 하고있었다 그걸 본 내가 수정을 요구하는 모습. 이렇게 YML작성법, 문법을 내가 외울 이유는없다 이게 왜 틀렸는지 무슨코드인지 흐름을 알면 "단순기억"은 AI가 압도적으로 잘하기 때문에 쉽게 고칠 수 있다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/13.Deploy-DockerComposeUp.PNG',
          comment:
            'ubuntu환경의 EC2 인스턴스 실행중 ls nano cd 등등.. 여러가지 리눅스 명령어를 사용했다. 이 배포과정에서 상당히 익숙해졌지만 배포란게 자주있는게 아니기에 필연적으로 머리론 까먹는다. 하지만 몸이 기억하고있다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/13.Deploy-Overbuild.PNG',
          comment:
            't2.micro 프리티어 메모리부족으로 빌드타임 오버. Github Actions도 똑같이 리소스부족으로 빌드타임 오버 현상이 일어났다.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/13.Deploy-On.PNG',
          comment:
            '돈만이 모든것을 능가한다!! t3.medium으로 배포성공. 요금 얼마나 먹을지 벌벌떨어가면서 몇 시간동안 테스트했다.',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/13.DeploySite.PNG',
          comment:
            '정상적으로 웹페이지가 접속된 모습. https 인증, 도메인 구매는 생략한다..',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/13.Deploy-last.png',
          comment:
            'GitHub Actions도 정상적으로 동작하는 모습. 아래 alert는 git push가 정상적으로 됐는지 확인하기위해 넣었다. 잘된다.',
        },
      ],
      description:
        '내 집 컴퓨터를 24시간 켜놔도 좋겠지만 편리하게 AWS EC2를 사용해서 배포하자. 우선 계획을수립했다. \n' +
        '\n 1. 코드를 Git Hub에 Push\n 2. EC2인스턴스를 만들고 환경설정, Git Clone으로 프로젝트파일과 dev파일 등 환경변수파일 복사\n3. Github Actions의 secret변수 등록 \n 4. 프론트, 백엔드에 deploy.yml파일작성 및 도커파일, 도커 컴포즈 파일 작성\n 5. git push로 CI/CD자동화 완성 확인' +
        '\n\n 큰 흐름은 이정도다. 우선 배포전에 도커환경에서 프론트,백엔드,엘라스틱서치,Redis 서버를 구동시키고 테스트해봤다. 이 와중에서 여러가지 오류, 버그를 발견할 수 있었고 배포전에 해결했다. 도커는 정말 고마우신 툴이다.' +
        '\n 어느정도 배포할 각이 나왔다 싶어서 EC2 프리티어 t2.micro를 사용했다. 하지만 이 때 난 몰랐다. 돈만이 모든것을 능가하리라곤..' +
        '\n \n우선 그 전에 배포할 방법을 설명하고 yml파일을 AI에게 작성시켰는데 docker compose파일을 사용한다는걸 폴더구조를 보고도 몰랐는지 tar파일을 만들고 난리가났다. 바로 수정을 요구했고 docker compose를 사용한 yml파일을 작성해주었다. AI 이전시대에는 on은뭐고 push는뭐고 jobs는뭐고 deploy는뭐고 runs-on은 뭐고 이런 하나하나 귀찮은 yml파일 문법을 하나하나 찾아서 끼워맞추고 했었겠지만 지금은 상황이 많이좋아졌다. 비유를하자면 AI가 집짓고 큰틀을 지어주고 인테리어까지 해주면 난 안에서 가구배치만 살짝 바꾸라고 턱으로 명령하면 된다. 전에도 언급했지만 비즈니스 의도를 확실히 하는건 인간이다. ' +
        '\n\n 아무튼 정상적으로 yml파일도 만들어놨고 CI/CD 파이프라인을 연결하기전에 EC2환경에서 배포가 잘 되는지 확인해보려고 정말 여러번 시도를해봤다. 하지만 배포던 CI/CD구축이던 t2.micro t2.small 따위론 리소스 부족현상을 몇번이고 경험했다. ' +
        '물론 이전에 Spring Boot프로젝트를 배포할때 처럼 이미 빌드된파일을 EC2인스턴스에 전송하고 뭐 그런 방법도 사용할 수 있겠지만 이번엔 사정이다르다. 내가 하고싶은건 GitHub Actions를 사용한 CI/CD자동화이기 때문에 인스턴스를 t3.medium으로 증설하고 실행했다. 정말 빨랐다.. 1000초 넘던 빌드타임이 100~200초 언저리에서 끝났다.' +
        'Github Actions도 정상적으로 동작했다.' +
        '\n\n물론 그 과정에서 서버 껐다켰다 하면서 EC2인스턴스의 아이피 주소도 변경되고(Elastic IP가 아니기에) 그걸 다시 백엔드 CORS설정에 쑤셔넣고 등등 많은 시행착오가 있었으나 이번에야말로 완벽하게 Github Actions를 통한 CI/CD 자동화 구축에 성공했다. 하지만 앞으로도 테스트 자동화등의 과제가 남았기때문에 점점 더 정진하고자 한다.',
      isSpecial: false,
      specialStyle: {},
      spDescription: {
        image: [],
        comment: '',
      },
      imageRight: false,
    },
    {
      id: 11,
      title: '11. 에러 핸들링 GlobalException',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/14.ErrorHandlingAdminException.jpg',
          comment:
            '최초 AI가 제시해준 클래스별 에러 코드. Admin이라는 디렉토리(기능)에 에러클래스들을 하나의 자바파일안에 여러개의 클래스로 작성해놨다.. 흠.. 이게 맞나 싶었다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/14.ErrorHandlingGlobalEH.jpg',
          comment:
            '전역 에러 처리 핸들러 코드. 간단하게 GlobalException 하나로 에러처리기를 통일하고 서비스 계층에서 파라미터값을 메세지, 에러코드를 유동적으로 할당하여 편리성, 재사용성, 가독성 UP',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/14.ErrorHandlingGemini.jpg',
          comment:
            '이런식으로 서비스계층에서 GlobalException을 유동적으로 사용. 프론트에서도 직관적인 에러코드, HttpsStatus를 받아서 확인, 처리하기 편하다. 또한 RuntimeException을 남용하여 개발자도구에서 노출되었던 API구조 등도 숨길 수 있어서 보안도UP',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/14.ErrorHandlingDemo.webp',
          comment:
            '프론트에서 받고있는 새로운 에러 메세지. 프론트의 에러처리 util함수도 추가했다 GitHub참조',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/14.ErrorHandlingMemberController.jpg',
          comment:
            '이런 쓸데없이 컨트롤러에서 try catch 쓰는 코드도 사라졌다. 서비스 계층에서 모든 에러를 처리하여 일관성 확보',
        },
      ],
      description:
        '이제 어느정도 프로젝트의 기능도 갖춰졌겠다 코드품질을 신경쓰기 시작했다 우선 에러핸들링. 이건 예전부터 생각하긴했으나 우선 코드를 뱉어내는게 중요하다고 판단해서 미뤄뒀으나 지금와서 생각해보니 에러핸들링을 먼저 작성해놓는게 훨씬 더 빠르고 질좋은 코드작성이 가능하다는걸 깨달았다.' +
        '\n\n 먼저 AI에게 Admin기능에 먼저 적용하고자 전역 에러핸들러를 요청했는데 정말로 Admin에만 해당하는 코드를 짜왔다.. 코드를 보고 이거 각 서비스마다 이렇게 핸들러 클래스를 하나하나 만드는건 말이 안되리라 생각하니 전역처리기 하나로 처리하는방법을 제시했다. 물론 파라미터값을 사용해서 서비스레이어에 각각 적용하는건 내 머리속에서 나왔다.. 아직까진 AI는 곧이 곧대로 뱉어내는 코드가 많다고 생각했다.\n' +
        '\n 우선 이 전역핸들러로 RuntimeExeception을 남용하지 않아도 되고 어디 서비스에서 무슨에러가 났는지 프론트에서도 직관적으로 알아보기 편하고 try catch를 남발하지 않고 가독성이 정말 좋아졌다. ' +
        '\n\n 아직 부족하다고 생각하는점은 에러핸들링을 굳이 사용하지 않아도 되는 단순 조회, 정적 데이터반환에서도 특수한상황이 일어날수있지 않을까? 하는 생각이 들기도했는데 아직까진 그런 상황에 직면하지 못했기에 추상적인 상상으로만 머릿속에 자리잡고있다는 것이다. 이것도 개발을 쌓아가며 경험으로 얻어야할 문제인 것 같다.',
      isSpecial: false,
      specialStyle: {},
      spDescription: {
        comment: '',
      },
      imageRight: false,
    },
    {
      id: 12,
      title: '12. 모니터링 기초 - Prometheus + Grafana',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/15.Monitoring-MetricNameChange.jpg',
          comment:
            'Metrics Config의 커스텀 메트릭. 저 builder()의 파라미터값 지정이 곧 그라파나에서 보여지는 Query명이 되는데, 기존에 AI가 그라파나에서 사용하는 _가 아닌 .으로 지정해놔서 수정하고 있는모습. ( 수정 전의 이름으로해도 그라파나 내부에서 알아서 변환해주긴 한데 일관성, 직관성이 떨어져서 바꿨다. )',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/15.Monitoring-Docker.jpg',
          comment:
            '역시 도커신의 힘을 빌렸다.. 근데 프로젝트 하나에 이렇게 덕지덕지 붙어있는걸 보면 뭔가.. 익숙하지 않다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/15.Monitoring-Prometheus.jpg',
          comment: '프로메테우스화면. 대체 이게 뭐가 뭔지..',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/15.Monitoring-GrafanaDashBoard-2.jpg',
          comment:
            '그라파나의 Dashboard 화면.  이미지 업로드, 포스트 업로드를 실제 행해서 적용되는지 확인해보고 각 패널이름도 변경해봤다. ',
        },
      ],
      description:
        '백엔드 모니터링으로 프로메테우스+그라파나를 적용해봤다. ELK스택을 미뤄두고 엘라스틱서치를 학습한 것 처럼 모니터링도 추후 필수가 될 것 이라 생각해서 기반정도는 쌓아놔야겠다고 생각했다.\n\n' +
        '우선 프로메테우스, 그라파나가 뭐냐? 비유하자면 프로메테우스는 CCTV, 그라파나는 통제실 화면 같은것 이다. 프로메테우스가 주기적으로 메트릭 (숫자로 측정 가능한 모든 데이터)를 수집하면 그걸 연결해서 시각화 해주는 것이 그라파나. \n\n' +
        '이 메트릭이라는게 중요한이유는 메모리 사용량, CPU사용률, 웹사이트 방문자수 등 이런 수치. 딱봐도 중요해보인다. 이걸보고 사이트가 왜 느린지 어디서 문제가 발생했는지 어떤 것이 인기있는지 등등 문제파악이 용이하고 수치화가 가능하단것이다.' +
        '\n\n 우선 스프링부트 프로젝트의 메트릭수집 단계는 Spring Boot Actuator -> Micrometer -> Prometheus 를 거쳐서 일종의 번역(변환)된다. \n\n' +
        '구현과정으로썬 1. build.gradle과 application.properties의 설정 \n 2. Dokcer Compose 설정 \n 3. 내 프로젝트에 필요한 커스텀 메트릭 구현\n' +
        '크게 3가지로 나뉘었다.\n\n 1번은 뭐 뻔하다 그냥 매번복붙하는 그것 맞다.. \n2. 도커 컴포즈역시 AI의 제공 템플릿을 따랐다. 하지만 컴포즈파일을 읽어보던중 그라파나의 포트번호가 3000번 = NUXT와 같기에 추후 중복되지 않게 초기 학습단계에서부터 3001번으로 포트지정하는게 좋을 것 같아 수정했다. \n3. 커스텀 메트릭도 상당히 간단했따. Counter클래스의 imageUploadCounter forumPostCounter라던가 내가 원하는대로 Bean이름과 그라파나에서 보이는 쿼리명 같은걸 지정하고 내 서비스로직에서 사용해주면 끝. 편리하다. \n\n' +
        '사실 말이 편리하지 프로메테우스랑 그라파나 화면들.. 처음에 이게 대체 뭔가싶고 이것저것 만져봐도 도통 뭐가 뭔지 몰랐다. 이럴때 도움되는게 AI다 요샌 캡쳐인식도 잘돼있는지 UI설명도 잘해주더라 덕분에 여러시행착오를 겪어가면서 PromQL의 존재와 활용, 그라파나에서 대쉬보드를 만들고 모니터링까지 할 수 있었다. \n\n이렇게 처음보는 툴 들도 빠른기간안에 본인의 AI활용 역량에 따라 빠른 학습이 가능하단걸 느꼈다. ' +
        '\n우선 모니터링 기초이기때문에 "이런게있고 이렇게 쓰는구나" 정도의 학습이었지만 추후 실제 서비스에서는 Prometheus로 이메일이나 슬랙등의 알림구현(예를들어 CPU초과, 메모리 부족, 에러율 폭증 등)이나 로그 집계로 고객성향, 이탈or재방문률들의 시각화와 분석 등 여러가지 방면에서 활용가능할 것 같다고 느꼈다. ELK스택과 함께활용하면 더 증대된다고 하니 프론트, 백엔드의 스택역량이 더 만족스럽게 다듬어진다면 이 DevOps의 영역에서 다시 활용해봐야겠다.',
      isSpecial: false,
      specialStyle: {},
      spDescription: {
        comment: '',
      },
      imageRight: false,
    },
    {
      id: 13,
      title: '13. 비동기 처리 Kafka - 회원가입 후 이메일 발송',
      images: [
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/17.Kafka.png',
          comment: '카프카 클러스터 구조도',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/17.Kafka-1.jpg',
          comment: '카프카의 구성요소 간단정리',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/17.Kafka-EmailOK.jpg',
          comment: '결과부터 확인 : 이메일 발송, 수신완료!',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/17.Kafka-AIMiss.jpg',
          comment:
            'AI와의 문답1. 설명을 너무 못한다. 카프카의 "필수요소 즉시응답"을 말하고 싶은 듯 했으나 내 이미지 분석로직을 잘못분석해서 필수요소를 선택적요소라고 파악하고 Kafka에 맡겨버리는 생각을 한 듯하다.. 이렇듯 이상한소리하는 AI에 채찍질 하는 사람이 되야겠다',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/17.Kafka-Answer.jpg',
          comment:
            'AI와의 문답2. 뭔가 요즘 AI는 죄다 아이고 내새끼 잘했어!! 다 니가맞아!! 하는경향이 있는 것 같아서 틀리면 틀렸다고 말하라 해야하는 것 같다. 뭘 자꾸 핵심을 찌르는 질문이란건지..',
        },
        {
          image:
            'https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/17.Kafka-LOWROI.jpg',
          comment:
            'AI와의 문답3. 카프카를 이해하고 사용하고자 했으나 AI는 역시 기능A를 모든곳에 사용하려고 하는듯하다.. 아직까지 비즈니스 로직 사용은 인간이 판단해야하는 것 같다',
        },
        // {
        //   image: '',
        //   comment: '',
        // },
      ],
      description:
        '우선 카프카가 뭐고 왜쓰냐? -> 결과먼저 말하면 그냥 내 함수에서 부가적인 작업이나, 내 웹페이지를 이용하는 유저에게 큰 상관 없는 서버로직 등을 비동기적으로 처리하여 유저들에게 더 빠른 UX를 제공할 수 있기 때문에 쓰는 외부서비스다. 이외에도 안정성 등등 여러가지가 있지만 크게는 "유저들한테 우선순위에서 밀리는 쓰잘데기없는거 뒤에서 다크나이트처럼 해주는거" 라고 생각하자. \n\n' +
        '예를 들어서 회원가입 후 이메일발송. 회원이 내 사이트에 가입하면 회원가입 후 이메일을 발송받는다. 그 회원가입을 시도하는 유저가 동시에 8천억명이 몰리면? -> 서버부하 심하고 회원가입이 됐다는 메세지조차 받기가 힘들 것이다. 그래서 회원가입이라는 필수적인 요소만 동기적으로 처리해서 유저들에게 회원가입 ㅊㅋㅊㅋ라고 빠르게 메세지를 주고, 회원가입 환영메일은 백그라운드(카프카)로 돌려서 설렁설렁 보내준다 이말이다.\n\n' +
        '이렇게 설명하면 정말 간단한데 AI는 뭔가 "유저놈은 이미 카프카를 알고있다"는 가정하의 설명을 뱉어내는 경향이 있어서 초기학습시 이해에 어려움이 있었다. 내 로직자체를 이해하지않기도 했고.. \n\n' +
        '작동원리는 간단했다. 우선 필수 구성요소 Producer, Consumer, Event, Topic, Partition을 이해하고 필요한 로직 작성-> 내 기존에 사용하던 서비스 로직에서 Producer로직사용-> Kafka의 해당하는 Topic에 전달 -> Consumer전달해서 로직사용. 간단한데 코드간의 흐름을 정확하게 이해하는게 중요하다.\n\n' +
        '아무튼 기초 Kafka의 사용이유와 작동원리를 이해하고 바로 비즈니스 로직 제안을 해서 뱉어내게했다. 가장 간단하고 유용할 것 같은 회원가입 후 환영 이메일 발송로직이다.\n' +
        '초기 AI제공 함수에선 내부 함수호출이 많기에 꼼꼼히 읽어야하는게 많았고, topic, partition, replicas, offset 등 카프카 클러스터와 설계원리를 이해하는데에 시간을 들였다.' +
        '이러한 원리를 이해하고 Docker를 켜서 실제 시험해보니 정상적으로 비동기 메일발송을 받을 수 있었다.',
      isSpecial: false,
      specialStyle: {},
      spDescription: {
        comment: '',
      },
      imageRight: false,
    },
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
