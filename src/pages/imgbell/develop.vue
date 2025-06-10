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
        image: [''],
        comment: '',
      },
      imageRight: false,
    },
    // {
    //   id: 7,
    //   title: '7. 어드민 페이지 관리기능',
    //   images: [
    //     {
    //       image: '/images/7.socket/chat1.PNG',
    //       comment: '1.필요한 기능을 정한다',
    //     },
    //     {
    //       image: '/images/7.socket/chat2.PNG',
    //       comment:
    //         '2. 코드짜다가 길거나 성가신 코드가있으면 한글로 먼저 필요한 코드를 정의한다(내가먼저 이해)',
    //     },
    //     {
    //       image: '/images/7.socket/chat3.PNG',
    //       comment:
    //         '3. AI를 사용해서 코드를 반환받고 향후 수정한다(빈ArrayList말고 FORBIDDEN에러를 return 한다던지..)',
    //     },
    //     {
    //       image: '/images/7.socket/chat4.webp',
    //       comment: '실시간 상담 시연',
    //     },
    //   ],
    //   description:
    //     '대 고객 서비스에서 자주보이는 채팅기능도 구현해봤다.  \n' +
    //     '우선 본인은 AI활용을 적극적으로 사용하는데, 기본적으로 좌측 절차를 걸친 활용법을 많이 사용한다.\n 무턱대고 코드 복붙은 강아지나 고양이도 가능하기 때문에 먼저 내 머리속으로 구현하고자 하는 기능을 확립하고 코드의 흐름을 이해하는게 가장 중요하다고 생각한다. \n\n' +
    //     '상담기능의 구조자체는 운영자와 회원의 1:1대화. 예외상황으로 A유저가 B유저의 상담을 볼 수 없게끔 처리, 기존에 상담한적이 있던 회원은 이전상담내역을 가져오는 등의 처리를 생각했다.\n' +
    //     '\n 실시간상담은 그냥 Websocket 혹은 socket.io라는 라이브러리를 쓰는 것 이기때문에 코드구현은 딱히 할게 없었지만 코드를 보고 이해하는데 신경을 썼다.' +
    //     '\n\n 개발경력 1년이 채 안된 지금 단계의 본인은 라이브러리를 그냥 가져다 쓰고 사용방법을 이해하는 정도의 개발자지만 시간과 노력을들여서 라이브러리 코드 자체를 보고 이해할 수 있는 좀 더 근본적인 수준의 코드를 다를 줄 아는 개발자가 되어야겠다고 느꼈다.',
    //   isSpecial: false,
    //   specialStyle: {},
    //   spDescription: {
    //     image: ['/images/newfront.PNG'],
    //     comment: '프론트 뉴스더보기 코드.',
    //   },
    //   imageRight: false,
    // },
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
    //     '내 집 컴퓨터를 24시간 켜놔도 좋겠지만 편리하게 AWS EC2 프리티어를 사용해서 배포하자. \n' +
    //     '사실 공부 초기엔 배포란걸 신입에게 시킬리도 없고 설정마다 달라서 의미가 없지않을까? 라고도 생각했지만 결국엔 EC2인스턴스를 사용하는법은 숙지해야하고 ' +
    //     '딱히 못할 이유도 없다고 생각해서 시작했다. \n\n' +
    //     '우선 nginx의 도커파일과 nginx.conf, 프론트, 백엔드의 Dockerfile을 작성하고, docker-compose.yml을 작성한다.\n\n' +
    //     'https인증관련 pem 파일을 생성하고 nginx.conf에 설정도 했다. 개발할땐 docker-compose.dev.yml파일을사용, 배포할땐 docker-compose.yml을 사용했다.' +
    //     '이후 Github Action 방법을 숙지했고, 사용하려고했으나 눈물나게도 프리티어 t2.micro 인스턴스는 너무 낮은 성능으로 CI/CD 파이프라인을 구현하기 어려웠다.\n\n 메모리 부족으로 4억번정도의 오류와 수많은 빌드시간을 소모했는데.' +
    //     '어떻게 문제를 해결할까 AI와 함께 고민한 결과 EC2인스턴스에서 직접 git clone을하고 CLI명령어로 env파일을 복사하는 등의 방법으로 배포하는데에 성공했다.\n\n' +
    //     '하지만 이는 사실상 임시방편. docker를 사용해서 멀티스테이징을 해도 이 역시 빌드시간이 꽤 걸렸고 효율적인 CI/CD 구현을 위해선 역시 Github Action등이 필요하다고 생각했다. 방법은 이미 숙지해놨기때문에 구현에는 문제가 없다고 생각하기에 언젠간 구현해보고자 한다.\n\n' +
    //     '또, nginx를 사용한 기능도 여러가지 공부할 수 있었다. https 인증, 리버스프록시, 로드밸런서, IP로그출력 및 제한 등. 향후 프로젝트에선 적극적으로 사용 해볼 예정이다.',
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
