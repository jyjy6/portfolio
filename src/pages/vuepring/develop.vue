<script setup lang="ts">
  import type { ComponentPublicInstance } from 'vue';
  import { onBeforeUnmount } from 'vue';
  import { ref } from 'vue';
  import { nextTick } from 'vue';
  import { onMounted } from 'vue';
  import TranslationComponent from '../../components/TranslationComponent.vue';
  import { translationConfig } from '../../utils/translationStore';

  const sections = [
    {
      id: 1,
      title: '1.사이트 첫 페이지',
      // 방법 3: public 폴더에 이미지를 넣은 경우 (권장)
      images: [{ image: '/images/1.webp', comment: '메인페이지 시연영상' }],
      description:
        '홈페이지는 복싱답게 랭킹 TOP3를 대문에 걸어놓고 뉴스, 추천영상등을 양방향으로 배치했다. 랭킹은 Intersection Observer사용해서 약간의 디자인.',
      isSpecial: false,
      specialStyle: {},
      imageRight: false,
    },

    {
      id: 2,
      title: '2. 로그인, 로그아웃',
      images: [
        {
          image: '/images/login-accessTokenb.webp',
          comment: '로그인했을 시 액세스토큰 확인',
        },
        {
          image: '/images/logout-refreshToken.webp',
          comment: '로그아웃 시 리프레시토큰 제거',
        },
        {
          image: '/images/oauthLogin.webp',
          comment: 'Google OAuth 로그인시 액세스토큰 저장',
        },
      ],
      description:
        '로그인, 로그아웃기능은 JWT를 사용했고, 로그인 시 accessToken은 localstorage에, ' +
        'refreshToken은 쿠키에 저장했다.\n\n' +
        'OAuth또한 Spring Boot의 OAuth2AuthenticationSuccessHandler로 동일방식으로 저장.\n' +
        '다만, OAuth의 accessToken의 경우 url쿼리로 1분짜리의 짧은 accessToken을 넣어서 발급, 추후 사이트이용시 프론트의 plugins/axios.ts 인터셉터를 거쳐서, 자동 재발급 되게끔 작성하였다.',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: ['/images/tokenRefreshPlugins.PNG'],
        comment: '프론트 accessToken재발급 예시코드 ',
      },
      imageRight: false,
    },
    {
      id: 3,
      title: '3. 뉴스',
      images: [{ image: '/images/newscheck.webp', comment: '뉴스섹션' }],
      description:
        '뉴스섹션은 웹개발 1개월차 쯤에 만든 기능인데, \n' +
        '정말간단하게 백엔드에서 모든 뉴스 데이터를 불러오는 findAll함수를 사용했었다.\n 당시에 뉴스 데이터가 많아지면 성능상에 문제가 있지않을까? 라는 의문만 갖고있던 상태였으며 프론트에서 페이지숫자를 조정하는. View만을 고려한 형태의 개발을 했었고, 이후 페이지네이션을 고려할 때\n 필요한 데이터만 API요청을 하는 방식으로 발전하게 된 계기가 됐다.',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: ['/images/newfront.PNG'],
        comment: '프론트 뉴스더보기 코드.',
      },
      imageRight: false,
    },
    {
      id: 4,
      title: '4. P4P Ranking',
      images: [{ image: '/images/change-p4p.webp', comment: 'P4P변경 시연' }],
      description:
        'P4P랭킹 또한 개발 초기단계에서 만든 기능인데 랭킹을 DB에 어떻게 등록할지, 등락을 어떻게 설정할지 등등 상당히 많이 고민한 기능이었다. \n' +
        '\n우선 프론트 유저경험으론 시연영상처럼 \n 체급선택-> 선수선택 -> P4P랭킹설정 -> 변경 리스트에추가 -> 랭킹변경 의 흐름으르 따른다.' +
        '\n전송 로직은 프론트에선 로그기록과 배열로 받은 각 복서들의 랭킹을 이전랭킹, 새랭킹을 저장하는 등 복잡한 로직을 작성하였다' +
        '\n\n 백엔드에서는 로그저장, 이전랭킹 저장, 새로운 랭킹저장 총 3개의 API를 작성하였다.' +
        '\n(* 상세코드는 백엔드Github P4P/P4PService의 코드 참조.)',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: [
          '/images/p4pfront.PNG',
          '/images/p4pback.PNG',
          '/images/p4pentity.PNG',
        ],
        comment:
          '1.프론트 전송코드   2.백엔드의 Controller코드   3.P4P엔티티의 코드-> Boxer엔티티와 join',
      },
      imageRight: false,
    },
    {
      id: 5,
      title: '5.Shop, 페이지네이션',
      images: [
        { image: '/images/shop.webp', comment: 'Shop페이지 시연영상' },
        { image: '/images/insertCart.webp', comment: '상품을 카트에 추가' },
        { image: '/images/cartToOrder.webp', comment: '카트 내 상품 주문' },
      ],
      description:
        'Shop은 당시 네이버 쇼핑의 디자인을 참고했으며 리팩토링시 Vuetify를 도입했다. \n' +
        '\n Cart와 구매목록 로직도 ' +
        '앞서 3.뉴스 섹션에서 페이지네이션을 고려할 때 느낀 "페이지에 해당하는 데이터만 "API요청을 하는 방식"을 3번째 이미지와 같이 본격적으로 구현했다.' +
        '\n 상품 상세 페이지에선 옵션을 선택했을때의 장바구니or바로구매 버튼 로직의 차이점, 옵션선택의 UX등을 최신의 전자상거래 사이트들의 표준처럼 구현했다.' +
        '\n\n 카트내에서 주문하기를 누르면(혹은 바로구매를 누르면) 주문서 작성하는 페이지로 이동하여 KAKAO주소 API를 이용한 주소선택, 개인정보입력를 입력하여 주문을 완료시킨다.' +
        '\n\n 주문이 완료되면 카트DB의 데이터를 주문DB으로 전송하고 주문DB에는 배송준비,결제완료,배송완료 등의 상태를 저장한다.' +
        '\n\n\n 토스페이먼츠 등 PG사 API를 도입하기도 했으나, 기존 로직과 웹훅 사용법의 차이점이 있는지 결제는 완료되나 DB이동이 의도대로 되지않아 우선 보류했다.' +
        'ADMIN페이지에선 들어온 Vuetify의 v-data-table로 주문목록을 나열 및 검색, 주문상태변경등의 로직을 구현했다.' +
        '\n\n이 부분도 모든 주문을 불러오는 findAll로 구현했는데 이 때도 효율적인 페이지네이션을 (지금 이 순간에도) 고려 했지만 첫 프로젝트의 허점으로 두기로하고 그냥 v-data-table의 필터기능을 남겨두기로 한다..',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: [
          '/images/v-data-table.PNG',
          '/images/v-data-table2.PNG',
          '/images/v-data-table3.PNG',
        ],
        comment: 'v-data-table의 코드, 배송상태 업데이트 함수',
      },
      imageRight: false,
    },
    {
      id: 6,
      title: '6. AWS S3',
      images: [
        {
          image: '/images/presignedURL-front.PNG',
          comment: '프론트엔드 PreSignedURL 코드',
        },
        {
          image: '/images/presignedURL-back.PNG',
          comment: '백엔드 PreSignedURL 코드',
        },
        {
          image: '/images/presignedURL-back2.PNG',
          comment:
            '업로드한 이미지를 사용확정하는 코드. (글 작성 폼에서 이미지업로드만 8억번 하는 악성유저 방지)',
        },
        {
          image: '/images/presignedURL-back3.PNG',
          comment:
            '업로드한 이미지를 사용확정하는 서비스 코드. 이때 각 이미지가 들어올 수 있는 POST API마다 이렇게 사용확정하는 방식을써야할까? 하는 의문이 들었고, 추후 발전하는계기가 됐다.',
        },
        {
          image: '/images/presignedURL-back4.PNG',
          comment:
            '이미지 Entity. imgUsed로 사용/비사용을 확인하고 주기적으로 삭제한다.',
        },
      ],
      description:
        '이미지 등 파일을 업로드할 때 AWS S3를 사용했다. 프론트 composable폴더 등에 useImageUpload 훅을 만들어서 각 컴포넌트에서 사용. \n' +
        '이미지 업로드 시 백엔드 엔드포인트로 PreSignedURL을 요청하여 PresignedURL과 실제 이미지 URL을 발급받아서 프론트로 전달한다. \n' +
        '이후 프론트에서 해당 PresignedURL을 사용하여 S3에 이미지를 업로드, 실제 이미지URL을 컴포넌트에서 사용한다. \n\n' +
        '개발시에 생각한게 "이러면 악질유저가 이미지업로드 8억번하고 글저장을하지 않으면 요금폭탄나오지않을까?" 라는 생각이들어 각 이미지들에 imgUsed를 사용하여 사용/비사용을 확인하고 주기적으로 삭제하는 로직을 구현하였다.\n\n' +
        '향후 다른 프로젝트에서도 개발자 본인이 악질유저가되어서 어떠한 버그, 예외상황을 생각하는게 중요하다고 생각했고, 사용/비사용 확인하는 로직도 진화해갔다. ',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: ['/images/presignedURL-back5.PNG'],
        comment:
          '이미지클린업서비스. 30분마다 한번씩 SpringBoot가 자동적으로 DB에서 미사용 데이터를 삭제하고 AWS S3에서도 삭제한다.',
      },
      imageRight: false,
    },
    {
      id: 7,
      title: '7. 실시간 채팅 기능(websocket), 내 AI활용법',
      images: [
        {
          image: '/images/7.socket/chat1.PNG',
          comment: '1.필요한 기능을 정한다',
        },
        {
          image: '/images/7.socket/chat2.PNG',
          comment:
            '2. 코드짜다가 길거나 성가신 코드가있으면 한글로 먼저 필요한 코드를 정의한다(내가먼저 이해)',
        },
        {
          image: '/images/7.socket/chat3.PNG',
          comment:
            '3. AI를 사용해서 코드를 반환받고 향후 수정한다(빈ArrayList말고 FORBIDDEN에러를 return 한다던지..)',
        },
        {
          image: '/images/7.socket/chat4.webp',
          comment: '실시간 상담 시연',
        },
      ],
      description:
        '대 고객 서비스에서 자주보이는 채팅기능도 구현해봤다.  \n' +
        '우선 본인은 AI활용을 적극적으로 사용하는데, 기본적으로 좌측 절차를 걸친 활용법을 많이 사용한다.\n 무턱대고 코드 복붙은 강아지나 고양이도 가능하기 때문에 먼저 내 머리속으로 구현하고자 하는 기능을 확립하고 코드의 흐름을 이해하는게 가장 중요하다고 생각한다. \n\n' +
        '상담기능의 구조자체는 운영자와 회원의 1:1대화. 예외상황으로 A유저가 B유저의 상담을 볼 수 없게끔 처리, 기존에 상담한적이 있던 회원은 이전상담내역을 가져오는 등의 처리를 생각했다.\n' +
        '\n 실시간상담은 그냥 Websocket 혹은 socket.io라는 라이브러리를 쓰는 것 이기때문에 코드구현은 딱히 할게 없었지만 코드를 보고 이해하는데 신경을 썼다.' +
        '\n\n 개발경력 1년이 채 안된 지금 단계의 본인은 라이브러리를 그냥 가져다 쓰고 사용방법을 이해하는 정도의 개발자지만 시간과 노력을들여서 라이브러리 코드 자체를 보고 이해할 수 있는 좀 더 근본적인 수준의 코드를 다를 줄 아는 개발자가 되어야겠다고 느꼈다.',
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
      title: '8. 배포 AWS EC2, Docker',
      images: [
        {
          image: '/images/deploy/docker-file.PNG',
          comment: '프론트 도커 파일예시',
        },
        {
          image: '/images/deploy/docker-compose.PNG',
          comment: 'docker-compose.yml',
        },
        {
          image: '/images/deploy/EC2-4files.PNG',
          comment: 'https를 위한 pem파일, 도커파일 등',
        },
        { image: '/images/deploy/EC2-2.PNG', comment: 'EC2인스턴스에 연결' },
        {
          image: '/images/deploy/EC2-3Docker.PNG',
          comment: 'git clone으로 생성된 폴더목록과 docker-compose실행.',
        },
      ],
      description:
        '내 집 컴퓨터를 24시간 켜놔도 좋겠지만 편리하게 AWS EC2 프리티어를 사용해서 배포하자. \n' +
        '사실 공부 초기엔 배포란걸 신입에게 시킬리도 없고 설정마다 달라서 의미가 없지않을까? 라고도 생각했지만 결국엔 EC2인스턴스를 사용하는법은 숙지해야하고 ' +
        '딱히 못할 이유도 없다고 생각해서 시작했다. \n\n' +
        '우선 nginx의 도커파일과 nginx.conf, 프론트, 백엔드의 Dockerfile을 작성하고, docker-compose.yml을 작성한다.\n\n' +
        'https인증관련 pem 파일을 생성하고 nginx.conf에 설정도 했다. 개발할땐 docker-compose.dev.yml파일을사용, 배포할땐 docker-compose.yml을 사용했다.' +
        '이후 Github Action 방법을 숙지했고, 사용하려고했으나 눈물나게도 프리티어 t2.micro 인스턴스는 너무 낮은 성능으로 CI/CD 파이프라인을 구현하기 어려웠다.\n\n 메모리 부족으로 4억번정도의 오류와 수많은 빌드시간을 소모했는데.' +
        '어떻게 문제를 해결할까 AI와 함께 고민한 결과 EC2인스턴스에서 직접 git clone을하고 CLI명령어로 env파일을 복사하는 등의 방법으로 배포하는데에 성공했다.\n\n' +
        '하지만 이는 사실상 임시방편. docker를 사용해서 멀티스테이징을 해도 이 역시 빌드시간이 꽤 걸렸고 효율적인 CI/CD 구현을 위해선 역시 Github Action등이 필요하다고 생각했다. 방법은 이미 숙지해놨기때문에 구현에는 문제가 없다고 생각하기에 언젠간 구현해보고자 한다.\n\n' +
        '또, nginx를 사용한 기능도 여러가지 공부할 수 있었다. https 인증, 리버스프록시, 로드밸런서, IP로그출력 및 제한 등. 향후 프로젝트에선 적극적으로 사용 해볼 예정이다.',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: [],
        comment:
          '사실 지금보고계신 이 웹페이지가 Github Action+EC2 조합으로 배포됨.',
      },
      imageRight: false,
    },
    {
      id: 9,
      title: '9. 폴더 구조, 리팩토링',
      images: [
        {
          image: '/images/refactor/refactoring1.PNG',
          comment: '이상한 폴더구조에서 NUXT3, VUE3 권장 폴더구조로 변경',
        },
        {
          image: '/images/refactor/refactoring2.png',
          comment:
            'Vuex->Pinia 각각의 Store를 독립적으로 만들고 Mutations가 필요없어서 더 간결',
        },
        {
          image: '/images/refactor/refactoring3.PNG',
          comment:
            '중복되는 폼을 사용할 경우 필요한 field를 props전송해서 코드중복을 최소화',
        },
      ],
      description:
        '첫 프로젝트여서 초기엔 폴더구조에 고민을 너무많이했다. Vue3는 강의도 제한적이고 당시 Github등에서 다른사람의 폴더구조를봐도 워낙 제각각이고 어떻게 해야할지 몰라서 우선 폴더구조는 미뤄두고 코드작성하는데에 집중한것 같다. 하지만 시간이지나면서 AI사용법도 익숙해졌기에 폴더구조부터 코드 자체를 Vuetify도입하거나 Vuex에서 Pinia로 상태관리 라이브러리를 교체하거나 중복코드의 컴포넌트 화 등 여러 리팩토링을 행했다.' +
        '\n\n ',
      isSpecial: true,
      specialStyle: {},
      spDescription: {
        image: ['/images/refactor/javafolder.PNG'],
        comment:
          '자바는 초기의 폴더구조 그대로. Entity,Repository,Service단위로 폴더구조를 나누는 것 보다 \n각 기능단위로 폴더를 나누고 사용하는게 훨씬 더 직관적이고 협업시 각 기능을 맡은 본인들만 관리하면 더 용이할 것이라고 생각했다.',
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
      Vue3 + Spring Project DevelopmentLog
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
              style="max-width: 100%; max-height: 450px; object-fit: contain"
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
              style="max-width: 100%; height: 550px; object-fit: contain"
            />
            <TranslationComponent
              :key="`image-comment-right-${section.id}-${i}`"
              :api-key="translationConfig.apiKey"
              style="margin-bottom: 30px"
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
