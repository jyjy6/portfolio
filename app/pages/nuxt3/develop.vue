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
    title: "1.사이트 첫 페이지",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/homepage1.webp",
        comment: "메인페이지 시연영상. 해당하는 요일만 효율적으로 GET요청",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/homepage-changevideo.webp",
        comment: "새로고침시 변경되는 메인영상",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/homepageSelectVideo.webp",
        comment: "방송선택시 변경되는 메인영상",
      },
    ],
    description:
      "개발 두번째 프로젝트. 모티브가 된 onsen.com 처럼 메인 좌측에 영상스트림, 우측에 공지 등의 캐러셀을 배치했다." +
      "\n\n 요일별로 방송이 있고, 해당 요일을 클릭하면 방송리스트가 나열된다. 예전이었다면 생각없이 모든데이터 불러와서 프론트에서 요일별로 나누는 효율없는 방식을 사용했겠지만 이번엔 쿼리스트링으로 효율적으로 데이터를 요청하는 방식을 사용했다." +
      "\n\n 메인 영상스트림은 초기에 랜덤으로 1개 뽑아와서 노출하고있다. 추후 사용자가 재생할 영상을 선택하면 해당영상으로 대체 된다.",
    isSpecial: false,
    specialStyle: {},
    imageRight: false,
  },

  {
    id: 2,
    title: "2. 로그인, 로그아웃",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/loginCheck.webp",
        comment: "로그인 실패 시 횟수제한, 성공 후 refresh, access 토큰확인",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/loginOAuth.webp",
        comment: "Google OAuth 로그인 시연영상",
      },
    ],
    description:
      "로그인, 로그아웃기능은 JWT를 사용했고 로그인 시 accessToken은 localstorage에, " +
      "refreshToken은 쿠키에 저장했다.\n\n" +
      "Google OAuth도 지원한다. Vue+SpringBoot와 개발진행과정은 동일하지만 리다이렉트 페이지 설정. 특히 Docker를 사용하거나 production 환경에서 구글 클라우드 콘솔과의 엔드포인트, URI에 차질이 있었기에 주의가 필요하다고 생각했다. 하지만 이 역시 큰그림은 이해했기에 결과적으로 구현하는데엔 시간문제였다.\n",
    isSpecial: false,
    specialStyle: {},
    imageRight: false,
  },
  {
    id: 3,
    title: "3.방송리스트, 해당방송의 에피소드 추가, 삭제 디테일 화면 등",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/broadcastlist1.webp",
        comment:
          "방송리스트 시연영상. 모든 방송엔 각자 에피소드 추가하는기능이 있고, 수정or삭제 버튼 클릭 시 해당방송의 고유번호에 따라 데이터를 바인딩. 혹은 삭제.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/contentsaddserarch.webp",
        comment: "방송(콘텐츠)추가 시연영상1. 검색기능도 구현했다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/postContent.webp",
        comment:
          "방송(콘텐츠)추가 시연영상2. 실제 방송을 추가하여 디테일화면에서 방송 진행자 정보도 팝업으로 확인가능하다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/contentsModifyDelete.webp",
        comment:
          "방송(콘텐츠)수정 삭제 영상. 여담으로 개발자도구 네트워크탭에 만료된 토큰 갱신하는 refresh-Token 엔드포인트도 정상적으로 작동중",
      },
    ],
    description:
      "방송리스트엔 모든 방송목록을 나열한다. 어드민페이지에서 방송, 진행자를 추가할 수 있고 방송 추가시에 DB에 등록되어있는 진행자 명단을 나열, 빠른검색기능도 구현했다. 물론 추가, 수정기능은 당연하게도 중복되는 코드가 있었기에 FormComponent로 컴포넌트화 했고 필요한 fields를 props전송, 수정기능의 경우 해당 방송의 _id에 해당하는 내용을 DB에서 불러와 바인딩했다 " +
      "이 때 v-dialog 등 적극적으로 Vuetify를 활용해서 모달, 검색자동완성 등의 기능을 구현했다.",
    isSpecial: true,
    specialStyle: {},
    spDescription: {
      image: [
        "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/contentsAddFrontCode.PNG",
      ],
      comment:
        "컨텐츠 추가시의 프론트 코드. apiUrl과 필요한 field를 props전송, 진행자 검색을 위한 데이터를 onMounted로 바인딩 하고있다.\n 운영자만 접근할 수 있기에 미들웨어, 레이아웃 admin을 적용한 모습도 볼 수 있다.",
    },
    imageRight: false,
  },
  {
    id: 4,
    title: "4. 운영자페이지 접근제어 - 클라이언트, 서버 미들웨어",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/adminFrontMiddleware.PNG",
        comment:
          "클라이언트(프런트엔드) 미들웨어. 단순하게 유저정보만을 확인한다",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/adminServerMiddleware.PNG",
        comment:
          "서버(백엔드) 미들웨어 예시.(상세코드 GitHub참조) JWT를 확인해보고 토큰이 없거나 유효하지않으면 401, 403에러를 낸다",
      },
    ],
    description:
      "NUXT에선 접근권한을 클라이언트, 서버미들웨어를 각각 구현할 수 있는데, 클라이언트 미들웨어에선 단순하게 유저정보를 확인해서 접근 제한할 컴포넌트에서 간단하게 미들웨어 등록하기만하면 사용가능하다." +
      "\n서버사이드에선 체크할 엔드포인트를 미들웨어 코드에 적용하면 된다." +
      "독립적으로 작용하기에 보안상 중요한 api요청 등은 서버에서, 간단하게 접근만 막고싶으면 클라이언트 미들웨어에서 걸러내는 식으로 구현할 수 있었다. 클라이언트 사이드에서 라우터이동, alert등의 안내로 UX도 개선할 수 있다고 느꼈다.",
    isSpecial: false,
    specialStyle: {},
    imageRight: false,
  },
  {
    id: 5,
    title: "5. 운영자페이지 기능 - 멤버목록 및 관리, 배너등록 및 관리",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/adminChangeUserinfo.webp",
        comment:
          "운영자페이지 유저정보 변경 시연. 프리미엄/일반회원(role) 변경, 프리미엄 기간 등을 변경하면 좋을 것 같다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/adminChangeBanner.webp",
        comment: "배너관리 시연",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/memberSearch.PNG",
        comment: "멤버목록 검색 코드",
      },
    ],
    description:
      "운영자페이지는 앞서 미들웨어로 접근제어 하고 운영자 전용 layout으로 콘텐츠 추가 진행자 추가 등 운영자 전용 페이지 목록을 설정했다." +
      '\n 멤버목록의 검색기능은 쿼리파라미터로 검색어를 입력할때마다 API요청해서 해당하는 데이터만 바인딩했다. 이 기능을 구현하던 도중 단어 하나하나 입력할때마다 API를 요청하는 비효율성과 몽고DB에서 "자음"을 검색했을때 데이터를 찾지 못하는 오류등이 발생 했는데, 0.5초의 딜레이를 줘서 API요청을 하거나, MongoDB에서는 자음을 호환 유니코드로 저장되거나 하는 경우가있어서 매핑한다거나 하는 방식도 알게되었고 해결했다.' +
      "\n\n 배너관리는 추가항목과 분리했고 활성화, 비활성화 상태를 DB에 저장하고 유저가 토글형식으로 손쉽게 변경할 수 있는 UX를 구현했다. 개선점이 있다면 상단배너가 뭐 어디에 위치한건지 슬라이드는 어디에 위치해있는지를 유저에게 쉽게 파악할 수 있게 해주는 네비이게이션이든 모달이든 UX개선이 필요할거같다.",
    isSpecial: true,
    specialStyle: {},
    spDescription: {
      image: [
        "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/memberSearchJaum.PNG",
      ],
      comment:
        "서버 코드의 자음 매핑.MongoDB는 호환 유니코드로 저장하나보다 새로운 정보였다 ",
    },
    imageRight: false,
  },
  {
    id: 6,
    title: "6. AWS S3 업로드",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/S3upload1.PNG",
        comment:
          "FormComponent안에 FileUploadComponent를 자식 컴포넌트로 추가한다",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/S3upload2.PNG",
        comment:
          "FileUploadComponent의 handleFileChange함수. uploadToS3함수를 발동하고, 부모컴포넌트에 발급받은 PresignedURL을 전달한다",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/S3upload4.PNG",
        comment:
          "composable/userS3Upload.ts의 uploadToS3함수. file과 temp를 파라미터로 받고 파일사이즈같은것도 검증. api/upload로 API요청한다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/S3upload5.PNG",
        comment:
          "api/upload 엔드포인트의코드. S3관련 환경변수도 까보고 디코딩 등의 작업도 수행하고 presiginedURL을 요청한다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/S3upload7.PNG",
        comment:
          "다시 uploadToS3함수로 돌아와서 API요청이 성공했으면 uploadedUrl 변수에 해당 URL을 담는다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/S3upload8.PNG",
        comment:
          "FileUploadComponent의 comfirmFile함수. 여기서도 한번 더 uploadToS3함수를 실행하는데 이번엔 두번째 파라미터값(temp)이 false다 임시파일이아닌 확정적인 파일이므로.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/S3upload9.PNG",
        comment:
          "부모 컴포넌트인 FormComponent로 돌아와서 각 FileUploadComponent를 사용한 필드마다 파일업로드를 확정한다. 하나라도 실패하면 폼이 불안정할 수 있기때문에 Promise.all로 모두 성공했을때만 폼을 제출하게 유도.",
      },
    ],
    description:
      "Vue+Spring 프로젝트와는 다르게 S3업로드를 구현했다." +
      "\n\n 1. 우선 FormComponent의 자식컴포넌트로 파일업로드 관련 작업을 처리하는 FileUploadComponent를 구현했다." +
      "\n\n 2. FileUploadComponent에서는 먼저 파일 업로드 시 uploadToS3 함수를 사용하여 S3 PresignedURL를 요청한다. (여기서 이 발급받은 URL은 임시로 사용한다. -> 파일업로드만 하고 글저장 안하는 악질유저 방지) " +
      "\n\n 3. uploadToS3에서는 파라미터값으로 파일, temp(임시인지 아닌지 확인)를 받고 /api/upload로 api요청을 한다. 해당 API에선 S3 액세스,시크릿키 검증과 temp파일 여부에따라 폴더구조를 결정하고 presignedURL을 발급받는다." +
      "\n\n 4. 발급된 URL은 uploadedURL이라는 변수에 담고, emit함수로 부모컴포넌트에 전파한다. [자식(FileUploadComponent) -> 부모(FormComponent)에게 이 URL 받아왔어요~ 한다고 알려줌]" +
      "\n\n 5. 파일이 만족스러워서 폼 전송을 하면 FileUploadComponent에서 confirmFile함수를 발동시켜서 S3에 파일업로드를 확정시키고, DB에도 확정된 URL을 저장한다." +
      "",
    isSpecial: true,
    specialStyle: {},
    spDescription: {
      image: [
        "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/S3uploadfinal.PNG",
      ],
      comment:
        "S3의 수명주기 규칙. temp폴더에 있는 모든 임시자료들은 S3에서 자동으로 삭제시켜준다. Vue+Spring때는 일일이 내 서버와 DB에서 임시자료들을 삭제했지만 이번엔 S3제공 서비스를 사용하여 자동으로 삭제하는 방식으로 개선했다.",
    },
    imageRight: false,
  },
  {
    id: 7,
    title: "7. 배포",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/deploy1.PNG",
        comment: "GoogleKeep에 정리한 배포과정 1",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/deploy2.PNG",
        comment: "GoogleKeep에 정리한 배포과정 2",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/deploy3.PNG",
        comment: "GoogleKeep에 정리한 배포과정 3",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/deploy4.PNG",
        comment: "GoogleKeep에 정리한 배포과정 4",
      },
    ],
    description:
      "최초엔 Docker와 EC2와 Github Action을 사용하여 CI/CD 를 구축하고자 했는데 NUXT프로젝트는 배포과정에서 자꾸 무한빌드 현상이 발생했다. " +
      "오류메세지가 뜨지않고 EC2에서 빌드자체가 되질 않아서 상당히 의문이었다." +
      "\n\n결국 t2.micro의 메모리부족임을 깨닫고 해결방법을 탐색했고 결과적으로 로컬에서 프로젝트를 빌드 후 배포용 docker파일을 만들고 -> tar.gz파일로 압축 -> scip -id 명령어로 EC2인스턴스에 전송 -> docker load로 이미지를 로드 -> EC2인스턴스에서 docker-compose 를 작성하고 실행하는 방식으로 배포를 진행했다." +
      "\n\n이 배포방법 역시 너무 제한적이고 수정할 때 마다 매번 새로 빌드, tar파일 전송등 제약이 너무너무너무 많기때문에 좀 더 나은 방법을 찾아야겠다고 생각했지만 사실 t1.micro의 메모리제한이 근본적인 문제라 더이상 나은 방법이 있을까? 싶기도 한다. 다른 배포 플랫폼을 찾는 방식도 당연히 선택할 수 있었지만, 현재 내 개발레벨에선 해결능력을 키우기 위해 문제에 봉착했을 때 몸 비틀어가면서 해답을 도출 하는게 결과적으로 피가되고 살이 될 것이라고 생각한다",
    isSpecial: true,
    specialStyle: {},
    spDescription: {
      image: [
        "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/deployGithubAction.PNG",
      ],
      comment:
        "Github Action의 처참한 현장.. 그래도 성공하는것도 있는걸 보면 확실히 사용하는 큰그림은 터득했다. \n 결국 지금보고계신 이 웹페이지를 Git Action+EC2로 배포하는데에 성공했다.",
    },
    imageRight: false,
  },
  {
    id: 8,
    title: "8. Nuxt의 서버사이드 렌더링(SSR)과 SEO 최적화",
    images: [
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/1.SSRUseAsyncData.PNG",
        comment: "기존의 onMounted와 SSR에 맞춰진 useAsyncData 사용 코드 비교",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/1.SSRPage.webp",
        comment: "이전과 같이 정상적으로 렌더링 되고있다.",
      },
      {
        image:
          "https://juneyoung2da.s3.ap-northeast-2.amazonaws.com/portfolio/imgbell/1.SSRSEOMeta.PNG",
        comment:
          "SEO에 필요한 NUXT만의 meta등록. script태그내에 정말 간편하게 등록할 수 있다.",
      },
    ],
    description:
      "SSR, SEO기능도 신경썼는데 사실 처음엔 NUXT 페이지 라우팅 자체가 SSR을 지원하기떄문에 자동으로 모든게 SEO에 최적화되어있다고 생각했다. 하지만 다른프로젝트나 공부를 진행하면서 Vue3 onMounted함수가 CSR이라는것에 대해 알게되어서 내 프로젝트도 수정이 필요하다고 생각했다. \n" +
      "우선 onMounted를 제거하고 컴포넌트 초기 연결시 한번 발동되는 useAsyncData를 사용하여 바인딩하는 식으로 수정했다. 이 NUXT기본 제공함수를 사용함으로써 먼저 HTML이 서버측에서 렌더링되어 SSR SEO를 구현할 수 있다. " +
      "\n\nSEO의 핵심 전제조건은 \n\n1. JS실행없이도 콘텐츠가 보여야 한다는것 즉 서버에서 미리 페이지 만들어서 보여줘야한다는것(SSR)\n 2. meta태그\n 3. 외부링크 or 검색엔진 or 구글 서치콘솔에 등록되어야 할 것\n 4. robots.txt -> 크롤러가 접근 가능한 페이지 설정이 되어있어야한다는 것 이 네가지임을 명심해야겠다. 요즘 웹페이지 사용은 검색이 핵심이다 최대한 검색으로 노출되어, 유저들에게 많이 보여지는게 모던웹개발의 메타? 유행이자 웹개발에 돈 쓰는 이유라고 생각한다. CSR은 예쁘게 보이는곳, UX상향 시키고 싶은곳에 쓰자",
    isSpecial: false,
    specialStyle: {},
    spDescription: {
      image: [""],
      comment: "",
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
  <v-container>
    <h1 class="text-center mb-10">
      <v-icon icon="mdi-nuxt" class="mr-2" size="x-large"></v-icon>
      NUXT3 Project DevelopmentLog
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
          :key="`section-special-comment-${section.id}`"
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
