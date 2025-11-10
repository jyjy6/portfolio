<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { onBeforeUnmount } from "vue";
import { ref } from "vue";
import { nextTick } from "vue";
import { onMounted } from "vue";
import TranslationComponent from "../../components/TranslationComponent.vue";
import { translationConfig } from "../../utils/translationUtil";

const sections = [
  {
    id: 1,
    title:
      "1. ImgBell 모놀리식 -> AuthBell+MusicBell 추가 MSA로 확장, SSO구현, 메인페이지",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/32133.png",
        comment:
          "백엔드 아키텍쳐. 틀 을그리고 GPT에 생성요청했는데 좀 빠진게 듬성듬성.. 아무튼 기본적으론 Docker Compose위에서 이러한 MSA를 이루고 있다",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/1.SSOLogin.webp",
        comment:
          "SSO완성 결과 1. ImgBell에 로그인해서 Cookie에 refresh, Access토큰을 저장 후 user정보도 localstorage에 저장하고있다. MSA의 한 서비스인 MusicBell도 쿠키에 저장된 모습. 새로고침 시 user정보도 역시 localstorage에 저장되고있다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/2.SSOLogout.webp",
        comment:
          "SSO완성 결과 2. 이번엔 MusicBell에서 로그아웃 시 Cookie와 user정보가 삭제되고 ImgBell에서도 Cookie가 삭제되어있다. user정보는 새로고침 시 삭제되고 토큰만료 안내alert를 출력하고있다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/1.SSO+keys.jpg",
        comment:
          "privateKey와 publicKey를 생성자로 로드하고있는모습. 저걸 뭐 누가 어떻게 외우나? 외울이유가 없다 이런건. 중요한건 작동원리.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/1.SSO+keys2.jpg",
        comment:
          'Claude의 키생성과정 설명. 저게 뭔소린지 알아듣는사람 없을거다 중요한건 이 PrivateKey는 AuthBell만 갖고있는 도장이고, PublicKey는 모든 MSA서비스에 뿌리고 저 도장이 진짜인지 확인하는 "기계"같은것이다. 이렇게 JWT의 유효성을 안전하게 검증하는 것.',
      },

      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/1.MSA+Docker.jpg",
        comment:
          "MSA의 도커환경. 정말.. 초대형 웹서비스는 어떻게 돌아가고 있을지 감도 안온다",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/1.MainPage.webp",
        comment:
          "메인페이지. 여느 음악사이트와 같은 고정 하단플레이어, 재생목록, 최근들은목록을 구현했다.",
      },
    ],
    description:
      "꽤나 고생한거같다 사실 시간이야1~2일만에 MSA구축을 완료했지만 AI한계를 느껴서 정신적인 데미지를 받은 듯 한 느낌이다\n\n" +
      "우선 개발 흐름. MSA가 네이버쇼핑, 네이버웹툰 뭐 이런 것 처럼 각 서비스가 독립적으로 운용되는 서비스는 알고있었다. 그래서 나도 MusicBell프로젝트를 추가하고 AI제공 Vuetify코드와 적절한 지시, 수정으로 프론트를 완성했다. 이제 봉착한 문제는 로그인이다. 어떻게 A서비스에서 로그인해야 B서비스도 그 로그인(유저)정보를 공유할 수 있는가에 봉착했고 AI에 솔루션을 요청했다.\n" +
      "하지만.. app.cookie.domain=.localhost <- 이와같이 뭔 이상한 로컬호스트 도메인설정을 생판 처음보는 식으로 하라고 하질 않나, \n 서비스A에서 로그인 한걸 서비스B로 쿠키 복사를 하라고 하질 않나 정말.. 많은 일이 있었다..\n" +
      "기본적으로 인증을 담당하는 AuthBell백엔드를 하나 더 추가하고 RSA비대칭 키를 활용한 JWT발급을 채택했다. 큰 흐름으로는\n" +
      "1. 사용자 → 운영되고있는 아무 MSA서비스에서 -> AuthBell에 로그인 요청.\n" +
      "2. AuthBell: Private Key로 JWT 서명 후 발행\n" +
      "3. 사용자(ImgBell이용중) JWT와 함께 요청\n" +
      "4. ImgBell서버는 Public Key로 JWT 검증\n" +
      "이거와는 별개로\n" +
      "5. 사용자(이번엔 MusicBell이용중) 같은 JWT로 요청\n" +
      "6. MusicBell서버 또한 Public Key로 JWT 검증\n" +
      "이렇게 각 서비스의 JWTFilter를 거쳐서 검증하는 방식이 되시겠다. 쿠키공유는 domain을 알맞게(여기선 localhost, 실제서비스면 최상위도메인(예: .naver.com 같은)을 지정하여 accessToken refreshToken을 공유하는 방식이다." +
      '\n\n글로는 정말 간단하게 구현한것 처럼 보이는데 난 애초에 "이런게 있다" 라는 지식이 없는상태로 0부터 기술을 파내는 작업이었기에 AI를 끊임없이 의심해야했다. 그 과정에서 docker compose 포트설정을 이상하게 하질 않나, 프론트의 axios interceptor를 이상하게 등록해서 무한반복이 일어나질않나 내 코드를 삭제하질 않나 정말 고생했다. 심지어 유료 Cursor Pro는 요금제 오버가 돼서 사용하지 못한 상태로. \n\n' +
      "하지만 이런 과정들을 더 겪고 2~3년 전만 해도 생각하기 힘들었을, 실질 경력 1년 언저리의 개발자가 MSA SSO구현을 1~2일 만에 스스로 해냈다는데에 달성감을 느낄 수 있었다. 이렇듯 AI활용을 통해 지식을 흡수해가면 더욱 나은 개발자가 될 수 있다는 자신감을 얻을 수 있었다." +
      "\n\n 자랑그만하고 이제 구현하면서 의심, 생각해본건 우선 accessToken이 쿠키로 옮겨짐으로써 csrf보안에 취약해지지 않았을까? 하는 생각과, AuthBell을 추가함으로써 회원정보테이블을 하나 더 만들어야 한다는 현실. 개인적으론 이게 효율적일까? 최선일까? 하는 생각이 자꾸들었다. \n만약 이렇게 회원정보테이블이 하나 더 필요하다면 회원가입 -> ImgBell의 DB에 유저정보 저장 -> Kafka등을 활용하여 AuthBell에 이벤트 알림을 하여 AuthBellDB에 비동기적으로 유저정보 저장을 해야겠다는 생각도 들었다. 그리고 테스트코드.. 에러핸들러 등등.. 함수 하나하나에도 정말 공을들여야 하는 것 같다\n\n" +
      "하지만 가장 뼈저리게 느낀 의구심은 모두들 MSA를 막상 시작하지말고 모놀리식부터 시작하라고한다. 뭐 물론 맞는말인것 같긴 하지만 적어도 이 프로젝트의 AuthBell처럼 회원정보나 인증을 담당하는 백엔드를 처음부터 만들면 마이그레이션이나 코드 리팩토링등의 비용을 더 줄일 수 있지 않을까? 하는 생각도 들었다. 물론 모놀리식에서 끝나게 된다면 비용낭비가 될 수 있겠지만 웹서비스를 시작함에 있어서 언젠간 고려해볼 사항이라고 생각했다. \n\n" +
      "메인페이지 디자인은 Vuetify로 구현했고 음악재생리스트, 최근플레이음악은 Redis도입으로 구현했다. 개발 초기부터 Redis ES Kafka 등을 사용할까 많이 고민했는데.. Redis정도는 우선 써도 될거라고 생각했다.",
    isSpecial: true,
    specialStyle: {},
    spDescription: {
      image: [
        "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/musicbell/1.SSO+ResponseCookie.jpg",
      ],
      comment:
        "쿠키로 옮겨간 액세스토큰. sameSite=Strict로 CSRF공격을 방지하는것과, 쿠키도메인 설정을 프론트로하고 nginx로 백엔드에 프록시 하는 등 여러가지 보안 설정을 다시금 머리에 집어넣었다.",
    },
    imageRight: false,
  },
  {
    id: 2,
    title: "2. 음악+아티스트 업로드 - AWS S3, DB설계, 마이그레이션 등 ",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/2.Upload-ArtistUpload.jpg",
        comment:
          "아티스트 업로드 페이지. 최초엔 Artist테이블은 추가하지 않으려 했다가 추후 여러 통계등에 사용할 것 같아서 추가했다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/2.Upload-MusicUpload.webp",
        comment:
          "음악 업로드 페이지. 파일 업로드 시 기본적으로 재생시간, 아티스트명, 음악명 이 자동으로 기록된다. 아티스트의 경우 기존에 등록해놓은 아티스트에서 선택하는 방식이다. 기존 등록해놓지 않은 신인 아티스트라면 그냥 텍스트 입력으로도 임시OK",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/2.Upload-Migration.jpg",
        comment:
          "백엔드 마이그레이션 코드. AtomicInteger라는것도 처음보는 개념도 있었다.",
      },
    ],
    description:
      "ImgBell에서 보인 AWS S3와 사용법은 거의 비슷하므로 생략하겠다. 차이점이있다면 음악파일+앨범커버이미지 두개의 파일을 업로드 해야했기 때문에 AWS S3역시 폼 한번에 두번 사용했다. 처음하는 거지만 프론트 S3컴포넌트 작성에도 적응되었고 AI의 힘도 있기때문에 별다른 어려움은 없었다. \n\n" +
      '우선 DB설계는 AI에게 대형 음악사이트의 테이블 컬럼들을 추천받았고 어느정도 생각한 항목들이 있었기에 짜잘한 수정만이 있었다. 하지만 Music테이블에 Artist를 "테이블"로 둬서 @ManyToOne을 붙일지, 아니면 단순하게 String artist 로 간단하게 만들지 고민했는데, 최초엔 후자로 해서 간단하게 구현했으나 역시 여러모로 Artist 항목은 필요할 것 같아서 백엔드 마이그레이션을 진행하는 등 여러가지를 시도해봤다.' +
      "사실 처음부터 잘하면 되는거 맞다. 근데 사람이란 만사가 의도된대로 흘러가는게 아니기에 일부러 이런 트러블을 내서 문제대처능력을 키우는게 학습에 더 도움되리라 생각하고 나 스스로가 문제를 만들고 해결해 봤다. \n\n" +
      "마이그레이션도 사실 프론트랑 연계해서 Form으로 Artist항목 수정하게 하면 되긴한데 데이터가 5만개있으면 어떻게할것인가? 라는 마인드로 백엔드 코드를 구현하기로했다. \n" +
      '라곤해도 큰그림을 AI에게 쥐어줘서 뱉어낸 코드를 내가 이해하고 수정하는 방식이었다. 완성된 코드결과를 보니 AtomicInteger라는 멀티스레드 환경에서 안전한 정수카운터, 배치작업 등등을 행했는데 사실 싱글 스레드이기에 AtomicInteger는 그닥 필요가 없었으나 프로그래밍에 있어서 인간은 "이런게 있구나"라는걸 뇌내에 각인시켜놓는게 중요하기에 단순 AI코드 복붙만이 아닌 이해하는 과정에서 공부가 되었다고 생각한다.' +
      "지금 생각해보면 이 마이그레이션 코드도 최소 5년차 이상의 결과물인데 설계만 잘한다면 1년차인 나도 활용할 수 있다는게 이 AI시대에서의 최대 장점인것 같다. 전부 내것으로 만들기 위해 적극 활용해야겠다.",
    isSpecial: false,
    specialStyle: {},
    spDescription: {
      image: [""],
      comment: "",
    },
    imageRight: false,
  },
  {
    id: 3,
    title:
      "3. Redis, 성능최적화 - 최근 재생목록, 플레이리스트, 일간,월간 주간랭킹 + BATCH를 활용한 최적화와 FrontEnd 캐시 사용 최적화",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/3.Redis-addPlayList.jpg",
        comment:
          '백엔드 Redis 플레이리스트에 음악정보를 추가하는코드. ImgBell의 코드를 재활용+리팩토링했고 동작원리, 큰그림을 이해하고 AI, 인터넷에 있는 정보들을 "지력"으로써 활용하면 간단하다.',
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/3.Redis-ChartSlow.webp",
        comment:
          "시간이라도 멈춘듯이 너무느리다. 일간, 주간, 월간 차트들을 로드하는데 20초? 유저들 다 빠져나가겠다!",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/3.Redis-BatchCodeFront.jpg",
        comment:
          "최초엔 Redis 캐시를 사용하는 최적화를 생각했으나, for문으로 데이터를 하나하나 불러오는게 문제같다고 최적화 솔루션 제공을 요청해봤더니 AI가 BATCH로 API를 사용하는 방식도 같이 추천해줬다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/3.Redis-ChartFast.webp",
        comment:
          "시간이라도 멈춘듯이 너무 빠르다!. BATCH를 활용하니 1초만에 뿅! 여기에 FrontEnd의 Cache까지 활용하면 API요청 비용도 절약할 수 있다. 이렇게 성능구현->최적화를 항상 염두해 두는 자세가 중요하다 AI는 이런 구조를 짜지 못하기에.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/3.FrontCacheCode.jpg",
        comment:
          "프론트 Cache코드. 프론트에서 캐시를 사용하는건 처음이었다. 백엔드까지 가지도않고 상당히 효율적인 방식을 AI가 추천해줬고 최적화 작업 할때 프론트선에서 Cut할 수 있는 방법도 내 무기로써 추가됐다.",
      },
    ],
    description:
      "ImgBell에서도 사용했던 Redis 이번에도 성능 최적화를 위해 도입했다. 여태껏 만든 기능을 쭉 둘러 보니 랭킹시스템, 최근들은음악, 플레이리스트 를 MySQL DB대신 Redis를 사용해서 간편하고 빠르게 구현할 수 있다고 생각했고 평소와 같이 구현에 성공했다. \n\n" +
      '하지만... 구현완료 후 브라우저를 확인해보니 너무 느린것이었다! 약 20초동안 데이터를 로딩하고있었고 브라우저의 네트워크탭을 확인해보니 음악데이터를 하나하나 API요청해서 불러오는게 문제였다. 처음엔 Redis를 사용하여 최초데이터를 캐싱해서 첫 로딩 이후엔 빠른 데이터제공을 하는방식으로 처리할까 생각했었는데 그 "첫 로딩"이 문제라고 생각했기에 다른 솔루션을 AI와 함께 상담했다. \n그래서 나온것이 BATCH방식을 활용한 API개선. ' +
      "Redis에서 랭킹목록을 List로 담아서 -> batch 음악정보를 한번에 뽑아내는방식이다. \n\n" +
      "실행해보니 정말 빠른결과를 얻어낼 수 있었고, 추가사항으로 AI가 프론트엔드에서 Cache를 활용하여 API요청 절약하는 방법까지 추천해줘서 한번 더 최적화하는데에 성공했다." +
      ' 이렇게 "무언가를 해야한다"라는 구조를 그리면 수십년차 개발자의 빅데이터나 다름없는 AI가 방법을 추천해주는데, 그걸 본인의 재량으로 효율적으로 활용하면 개발 연차가 짧아도 수십년차 개발자와 같은 수준의 코드를 뽑아낼 수 있다는게 요즘 개발의 중요한 메타인 것 같다고 느꼈다.',
    isSpecial: false,
    specialStyle: {},
    spDescription: {
      image: [""],
      comment: "",
    },
    imageRight: false,
  },
  {
    id: 4,
    title:
      "4. Elastic Search - 검색, DB->ES인덱스 동기화, Artist페이지+디테일 페이지",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/4.Artist-MainPage.webp",
        comment:
          "아티스트 메인페이지. 추천 아티스트 3명과 그 아래에 아티스목록 및 검색이있다. 더 보기를 클릭하면 서버로 9개의 아티스트 데이터를 추가요청 한다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/4.Artist-DetailPage.webp",
        comment:
          '아티스트 디테일 페이지. 아티스트 업로드시에 받은 정보들(외부링크 등)과 해당 아티스트의 음악 감상이 가능하다. 추가적으로 뭐 Music테이블에 Album항목을 추가하여 앨범별로 음악들을 묶는다던지, 관련 아티스트등을 표시할 수도 있을 것 같다. 결국 이런 "무슨 기능을 어떻게 구현하나"를 생각하는게 중요한 것 같다.',
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/4.Artist-ESearch.webp",
        comment:
          '엘라스틱 서치 활용. 그냥 보기에는 "Like 검색이랑 뭔차이여"일진 모르겠지만 데이터가 많아질수록 UX의 질은 차원이 다를 것이다.',
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/4.Artist-uploadESearch.webp",
        comment:
          "Artist Upload기능에서도 ES를 사용했다. autocomplete 기능으로 해당하는 아티스트를 바인딩 하고있다.",
      },
    ],
    description:
      "우선 Artist메인 페이지 디자인은 대형 음악스트리밍 사이트와 SNS등을 많이 참고했다. 간단하게 추천 아티스트 3명을 메인에, 아래엔 아티스트 검색 및 리스트를 나열해놓고 클릭 시 아티스트 상세페이지로 이동.\n\n" +
      "무한스크롤 기능역시 추가했다. 최초 9명의 아티스트를 띄워놓고 더보기 클릭시 서버에 요청을해서 추가로 9명의 데이터를 불러오는 성능또한 고려했다. \n\n" +
      "Elastic Search역시 도입했다. Artist에 적용을할까, Music에 적용을 할까 생각해봤는데, Music의 스탯이 변경될때마다 Artist또한 변경되어야 하고 ES에도 동기화 되어야 하기때문에 더 치밀하게 아키텍쳐를 생각해야하는 Artist에 ES도입하기로 결정했다. \n\n" +
      // '우선 복습할 겸 엘라스틱 서치의 사용이유, 동작원리를 간단하게 서술하자면, Index라는 DB와는 별도로 저장되는 ES전용 저장소를 활용하기때문에(DB보다 약 5배이상의 크기) 신중하게 사용결정을 내려야하며, 크게 DB에서 Index로 동기화하는 서비스레이어 + 실제 검색을담당하는 서비스레이어 두개를 운용하며 베이스가 되는 DB의 서비스와도 밀접하게 연관되어야 함을 명심해야한다.' +
      // '또한 Kafka까지 도입된다면 구조는 더욱 복잡해진다. \n하지만 이런 복잡한 구조의 리스크에 따른 리턴도 크다. DB서치와는 비교와도 안되는 검색속도와 인기검색, 오타검색, 자동완성 등 ES에서 제공하는 강력한 기능들로 인한 UX향상은 유저들로 하여금 다시 접속하고싶고자 하는 사이트를 만들어 낼 수 있다.'+
      "사용이유와 동작원리는 ImgBell의 상세 개발로그에(혹은 이 포트폴리오 GITHUB의 주석)도 설명되어있기에 생략한다." +
      "ImgBell과 같이 DB->Index 동기화를 담당하는 서비스로직, 검색을 담당하는 서비스로직을 추가했고 Kafka를 아직 도입하지 않은상태였기때문에 주석으로 추후 Kafka도입 필요함을 명시해놓고 이후 추가개발시의 편리함도 생각했다." +
      '이젠 ES는 처음 써본게 아니기때문에 뭐.. 딱히 개발하는데에 어려움이랄건 없었다. 하지만 이런 외부서비스, 라이브러리같은 경우에 "읽는방법, 유지보수 하는 방법"정도는 반드시 숙지하려는 자세를 갖춰야 한다.' +
      "",
    isSpecial: true,
    specialStyle: {},
    spDescription: {
      image: [
        "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/4.Artist-ESUpdateArtistCode.jpg",
      ],
      comment:
        "Artist를 업데이트 하는코드. ES에 동기화하는 코드를 맨아래에 빼놓고 주석으로 추후 Kafka추가할 것 임을 남겨두면 나중에 편하다.",
    },
    imageRight: false,
  },
  {
    id: 5,
    title: "5. Kafka - ElasticSearch Sync, Delete 비동기처리",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/5.Kafka+Logic.jpg",
        comment:
          "4. 엘라스틱 서치때에 설명 했다시피 미리 Kafka를 사용할 법한 장소에 이렇게 주석으로 마킹해두면 나중에 할일이 편해진다. 뭘 말하고싶냐?-> 백엔드에 있어서 미리미리 구조를 설계해놓으면 여러모로 편하다 라는것. 물론 인간이 하나하나 치밀하게 다 할 수 없는 노릇이지만, 그런 자세를 항상 염두해두자 라는 의식이 중요하다. ",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/5.Kafka+EsEvent.jpg",
        comment:
          "Artist를 Upload하면서 백엔드에 기록된 로직. 새아티스트를 DB에 저장하고있고 -> ElasticSearch Event를 전송하여 Kafka로 비동기 처리로직도 실행하고있다. DB에서의 쿼리문이 발동되어 저장이 된 후에 Kafka에서 아티스트 ES 인덱스 동기화가 완료되고 있는 모습이다. 즉 서비스로직 -> 즉시응답 -> Kafka비동기처리 실행. 이라는 순서가 잘 지켜지고 있다는 것.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/5.KafkaChico.jpg",
        comment:
          "Artist Upload 및 ES 인덱스 동기화가 가 끝난 후 아티스트 목록에 새로 데이터가 추가된 모습.",
      },
    ],
    description:
      "이번에도 Kafka역시 도입하였다. 뭐 대용량 트래픽이 들어오지 않기때문에 당연히 이것도 ES처럼 사용하는데 신중을 가해야 겠지만. 복습+기존 카프카를 도입하지 않은 환경에서의 추가 등의 시뮬레이션이기에 모던 웹개발 실력에 있어서 도움이 된다.\n\n" +
      "상세설명도 ImgBell에 구성요소와 클러스터 구조도를 이미 설명해 놨기때문에 생략하겠지만. 뭐 이번 프로젝트에있어서 간단하게 설명하면 컨슈머, 이벤트, 프로듀서를 설계하고 이전에 Kafka도입하면 좋겠다 라고 싶은곳에 리팩토링을 가했을 뿐이다. 참고로 이 프로젝트에서 Kafka 도입에 있어서 AI는 일절 사용하지 않았다. 뭐 도입해서 리팩토링하면 훨씬 더 쉬웠겠지만 굳이 사용할 필요도 없을 것 같다고생각했다. \n" +
      "기존에 ImgBell에서 사용하던 코드들을 재활용해서 MusicBell에 맞는 토픽명, 그룹아이디, application.properties설정등을 가해주고 서비스로직에 추가했을뿐이다. 솔직히 말은 쉽게하는데 이것도 어느정도 센스가 필요한 영역이라고 생각한다. \n\n" +
      "아무튼 어느정도 기능을 완성하고 여기에서 더 깊게 학습한건, acknowledgment.acknowledge()의 이유(수동커밋, 자동커밋)와, Kafka 설정 최적화, Dead Letter Queue의 개념 등이 있겠다.\n 아직 이 영역은 내 수준에서는 오버엔지니어링이기 때문에 개념정도만 알아두고 현업에서 필요할때 사용을 고려하는 것이 타당하다고 생각하지만 DLQ정도는 언제 한번 짚고 넘어가야겠다는 생각이 들었다. ",
    isSpecial: false,
    specialStyle: {},
    spDescription: {
      image: [""],
      comment: "",
    },
    imageRight: false,
  },

  {
    id: 6,
    title: "6. OpenAI Whisper를 활용한 가사(Lyrics) 추출 및 스트리밍",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/6.+GeminiLyrics+-+2Error.jpg",
        comment:
          "우선 Gemini Text To Speech API도 시도해봤으나 AI가 저 문제의 루프를 해결하지 못하고 헛돌기만했다. 수작업과 지시로 어떻게든 고쳤으나 API가 제공하는 데이터의 질이 너무 떨어져서 OpenAI로 변경하기로 마음먹었다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/6.GeminiLyrics-Service1.jpg",
        comment:
          'AI Agent가 비즈니스 의도를 이해하지 못하고 뭔 가사 창조를 하고있다. 이게 인간과 AI의 가장 큰 차이인 물리세계에 존재하지 않음으로써 일어나는 격차라고 생각한다. "대체 왜 가사를 니멋대로 창조해?"',
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/6.+OpenAILyrics.jpg",
        comment:
          "이 작업도 여러실패를 거쳤다. 위 스크린샷은 일단은 Whisper에게서 가사를 받아오는데에 성공한 스텝1 클리어 스크린샷. 하지만 라인 파싱에 실패하고있다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/6.+OpenAILyricsDetailOrder.jpg",
        comment:
          "그냥 가사 자체를 통째로 받아오고 가사 라인 파싱 및 수정은 인간이 상세하게 수작업으로 할 수 있도록 지시했다. 몇 번이나 중요하다고 느끼는 인간이 해야할 구조, 설계 작업이다.. 근데 이 작업은 우연이 겹쳐서 놀라운 부분이 있었다(최하단)",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/6.SGWannabe+MyLove.webp",
        comment:
          "가사추출 성공1. 상세히 들여다보면 뭐 다른점도 있기에 사람이 상세하게 수정한 후 DB에 업로드해야할 것이다. 가사 한줄한줄 프론트에 바인딩도 성공한 모습.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/6.+OpenAILyrics-SuccessNote.webp",
        comment:
          "가사추출 성공2. 일본어로도 정상적으로 가사를 생성 및 바인딩하고있다. 시작과 끝시간은 밀리초단위에서 초단위로 변경->MusicEntity의 duration과 일관성을 확보함으로써 음악 스트리밍과 동시에 음악+가사 스트리밍도 편하게 바인딩 할 수 있었다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/6.OpenAILyricsComplete.webp",
        comment:
          "가사 컴포넌트를 끼워넣고 의도한대로 실시간 가사또한 작동하는모습. 심심하면 뭐 폰트색깔이나 디자인을 바꿔도 좋을 것 같다.",
      },
    ],
    description:
      "AI API를 활용한 서비스도 익숙해지기 시작했고 음악스트리밍을 하는김에 가사도 자동으로 생성해보면 어떨까? 하는 생각이 들어서 바로 실행했다\n\n" +
      "항상하듯 큰그림. 구조설계 -> AI에게 API사용법 및 최초코드 요청 -> 로직 이해, 상세 수정 및 지시 -> 최종코드 완성 및 복습.\n\n" +
      "언제나처럼 진행했다. 사실 최초에는 AI가 추천한 Gemini, Google Speech To Text등의 질이 너무 떨어졌고 AI또한 가사를 창조하는 등 이상한 실수들을 많이 해서 버리는 코드들이 너무 많았다." +
      "\n\n 데이터의 질이 그렇게 좋지 않아서 OpenAI Whisper를 채택했는데 상당히 좋은결과물이 나왔길래 크레딧 결제 후 바로 적용에 들어갔다. Gemini에 익숙해졌기에 OpenAI 의 사용법은 좀 위화감이 있었다. 코드이해에 조금 더 많은 시간을 투자하고자했다. \n" +
      "아무튼 큰 그림에서 하나씩 기능을 완성시켜갔다. \n\n 1. 가사를 통째로 바인딩해보자 2. 바인딩 된 가사를 잘게 짤라볼까? 3. 프론트에 바인딩해볼까? 4. 음~ 상세수정이 필요하겠네 폼을 만들어서 상세수정한걸 유저가 수동으로 다시 전송시켜 볼까?" +
      "대충 이런느낌이다. \n\n" +
      "이번에도 역시 막히는 부분 차근차근 문제해결 해서 원하는 대로 기능을 완성시켰다. 완성시키고보니 내가 최근에 사용하고있는 AI 번역 툴인 Vrew와 비슷한 기능을 수행할 수 있을거라 생각이 들었다. 가사뿐만 아니라 대사를 추출한 번역툴, 청각장애인을 위한 앱 등등 새로운 가능성들도 보였다. 이런 기능 완성후 Add On으로 뭘 더 할 수 있을지 생각하는것도 중요한 자세이자 재산이 될 것 같다고 느꼈다.",
    isSpecial: true,
    specialStyle: {},
    spDescription: {
      image: [
        "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/6.OpenAIWhisperVerbose.jpg",
      ],
      comment:
        "놀랍게도 내가 서비스로직 설계할때 지시한 부분과 OpenAI Whisper의 verbose json이 뱉어내는 형식이 상당히 유사했다. 그래서 처음 AI가 제공한 코드를 보고 대체 내가 지시한 부분이 어디있지 싶었다... 뭐 API를 처음 사용함에 있음과 데이터 구조의 엄청난 유사성이 겹친 운에의한 결과였다.. 나쁜건지 좋은건지 우선 OpenAI Whisper의 작동원리는 확실하게 이해했다.",
    },
    imageRight: false,
  },

  {
    id: 7,
    title: "7. JWT보안 - RefreshToken Rotation, CSRF공격 대책책",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/7.RTR-RefreshTokenRotation.webp",
        comment:
          "RefreshToken Rotation이 구현돼있는모습. accessToken갱신 후 확인해보면 기존의 RefreshToken의 값이 변경되어있다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/7.RTR-DockerLog.jpg",
        comment:
          'Docker컨테이너 로그에도 잘 기록되어있는 모습. 근데 난 이 Redis나 DB에 JWT를 저장하는게 너무 회의적이다.. 물론 보안이 중요한곳에는 필요하겠지만 JWT최대의 장점이자 철학인 Stateless를 포기하기하는게 뭔가 찜찜해 죽겠다.. "굳이???... 굳이?!?!?!!?"라는 생각이 자꾸 머리속에 맴돈다.',
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/7.RTR.jpg",
        comment: "RefeshToken Rotation 동작흐름.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/7.RTR-JWT.webp",
        comment:
          "쿠키에서 기존 AccessToken을 삭제하고 Authorization Header에서 관리하고있다. XSRF토큰은..CSRF토큰 구현중의 잔재 무시하자.",
      },
    ],
    description:
      'RefreshToken Rotation이 뭐냐면 refreshToken 탈취당하면 어쩔껀데? 그거 30일짜리인데? "해커 : 엌ㅋㅋㅋ 30일동안 서비스이용 개꿀ㅋㅋ" 이라는 상황을 방지하기위해 accessToken갱신 시에 RefreshToken도 새로 발급, 저장하는 작업이다. \n\n' +
      " 뭐 한마디로 토큰 블랙리스트의 응용? 인 것 같다. 아니 이건 화이트리스트라고 보면 되겠다. \n 이런 작업이야말로 RDBMS보다 100배빠른 Redis를 활용할 때라고 생각했다. TTL설정시간, 기존 RefreshToken검증, 등록 등 거대한 구조만 설계해두면 AI가 코드로 번역해주기때문에 손쉬운 작업이었다. 이전에도 말 한것 같지만 마치 AI는 고급 번역기와도 같다.. \n\n" +
      "근데 매번 느끼는게 너무 찜찜하다 JWT를!! 왜!! 굳이DB에!! 저장해야하나!! 이럼 세션로그인이랑 다를게 없지않나!!(실제론 다르긴하다) 라는 생각을 많이 하게되지만 뭐 어쩔 수 있나 클라이언트의 요구사항이 있을 수도 있고 해본적있는 것과 안해본것의 차이는 언제나 크게 다가온다.\n 자기 자신만의 개발 철학은 중요하나 결코 절대적이지 않다 다른사람들의 철학도 존중해야 원만한 협력관계가 유지 될 수 있다고 생각한다.\n\n" +
      '이제 CSRF로 넘어가보자 이전 Vue+Spring 복싱 웹 페이지 프로젝트에선 CSRF토큰을 구현했는데 이번에도 그럴까 싶었으나 다른방식을 모색했다. "그냥 AccessToken을 Authorization Header로 발급, 검증 하면 CSRF로는 껄떡대지 못하는거아님?" 이란생각이 들었고, 맞았다.\n' +
      "refreshToken Rotation + XSS는 Vue의 이스케이프 문자지원 + csrf는 accessToken의 Authorization Header사용. 이 세가지가 현재 최선의 보안 구조인 것 같다.",
    isSpecial: true,
    specialStyle: {},
    spDescription: {
      image: [
        "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/musicbell/7.RTR-Order.jpg",
      ],
      comment:
        "AI에 요구사항을 프롬프팅하고있는모습. 설계짜놓고 그냥 내가 Redis부터 수작업으로 코드 짜볼까..? 했는데 굳이 그럴필요가 없다고 생각했다. 어짜피 레디스 함수들 지금쓴들 까먹을께 뻔하고 시간도 오래걸리고 그냥 아키텍쳐설계만 잘 하고 AI코드 검수하는게 훨씬 생산성이 높은 것 같다.. 수작업으로 했으면 3시간은 걸릴거 같다.\n\n 여담으로 Cursor Rules를 추가했는데 더 빠른 결과를 내놓는 것 같다.",
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
    domElement.scrollIntoView({ behavior: "smooth" });
    activeSection.value = sectionId;
  }
};

// 이미지를 새창에서 여는 함수
const openImageInNewTab = (imageUrl: string) => {
  window.open(imageUrl, "_blank");
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
        rootMargin: "0px 0px -10% 0px", // 화면 하단 10% 지점에서 트리거
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
      <v-icon icon="mdi-music" class="mr-2" size="x-large"></v-icon>
      MusicBell (MSA + SSO)
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
            <div class="toc-item-content">
              <a
                href="#"
                @click.prevent="scrollToSection(section.id)"
                :class="{ 'active-section': activeSection === section.id }"
                class="toc-link"
              >
                <v-icon
                  small
                  class="mr-2"
                  color="#64B5F6"
                  icon="mdi-chevron-right"
                />
                <TranslationComponent
                  :api-key="translationConfig.apiKey"
                  class="inline-translation"
                >
                  {{ section.title }}
                </TranslationComponent>
              </a>
            </div>
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
              style="
                max-width: 100%;
                max-height: 450px;
                object-fit: contain;
                cursor: pointer;
              "
              @click="openImageInNewTab(image.image)"
            />
            <TranslationComponent
              :key="`image-comment-${section.id}-${i}`"
              :api-key="translationConfig.apiKey"
              style="margin-bottom: 30px"
            >
              <p style="margin-bottom: 20px">{{ image.comment }}</p>
            </TranslationComponent>
          </div>
        </v-col>

        <!-- 오른쪽 컬럼 (설명) - 스티키 적용 -->
        <v-col cols="12" md="6">
          <v-card
            class="pa-10 text-left description-card"
            :class="section.isSpecial ? 'special-card' : ''"
            style="position: sticky; top: 150px"
          >
            <TranslationComponent
              :key="`translation-${section.id}`"
              :api-key="translationConfig.apiKey"
            >
              <div>{{ section.description }}</div>
            </TranslationComponent>
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
            <TranslationComponent
              :key="`translation-${section.id}`"
              :api-key="translationConfig.apiKey"
            >
              <div>{{ section.description }}</div>
            </TranslationComponent>
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
              style="
                max-width: 100%;
                height: 550px;
                object-fit: contain;
                cursor: pointer;
              "
              @click="openImageInNewTab(image.image)"
            />
            <TranslationComponent
              :key="`image-comment-right-${section.id}-${i}`"
              :api-key="translationConfig.apiKey"
            >
              <p>{{ image.comment }}</p>
            </TranslationComponent>
          </div>
        </v-col>
      </template>

      <!-- 특별한 섹션에만 추가되는 컨텐츠 -->
      <v-col v-if="section.isSpecial" cols="12" class="mt-4">
        <img
          v-for="spImg in section.spDescription?.image"
          :src="spImg"
          :alt="`image-${section.id}`"
          style="
            max-width: 100%;
            height: auto;
            object-fit: contain;
            cursor: pointer;
          "
          @click="openImageInNewTab(spImg)"
        />
        <TranslationComponent
          :key="`sp-translation-${section.id}`"
          :api-key="translationConfig.apiKey"
        >
          <v-alert
            type="info"
            variant="tonal"
            style="white-space: pre-line !important"
            v-if="section.spDescription?.comment"
          >
            {{ section.spDescription?.comment }}
          </v-alert>
        </TranslationComponent>
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
  transition: opacity 1.2s ease, transform 1.2s ease;
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
