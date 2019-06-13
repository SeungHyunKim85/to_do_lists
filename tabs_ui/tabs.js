class Tab {
  constructor(tabsData) {
    this.tabsData = tabsData; // this 에 빈 객체가 할당됨
    this.renderTabs();
    // active 클래스가 지정된 tab 요소와 같은 인덱스의 tab-content 요소만 표시
    // active 클래스가 지정된 tab 요소의 index, 같은 인덱스의 tab-content 요소 비교, 같으면 표시
    // active 클래스 tab만 표시하기
    function renderTabContent() {
      const $tabs = document.querySelectorAll('.tab');
      const activeIndex = [...$tabs].findIndex((element) => element.classList.contains('active'));
      const $tabContents = document.querySelectorAll('.tab-content');
      $tabContents.forEach((element, index) => {
        if (index === activeIndex) {
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        }
      });
    }
    renderTabContent();
    // tab 클릭 이벤트 핸들러 등록
    const $tabGroup = document.querySelector('.tab-group');
    $tabGroup.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab')) {
        const elements = e.target.parentNode.children;
        [...elements].forEach((element) => {
          if (element === e.target) {
            element.classList.add('active');
          } else {
            element.classList.remove('active');
          }
        });
        renderTabContent();
      }
    });
  }

  // tabsData 객체를 기반으로 tab-group 요소를 생성
  renderTabs() {
    const html = `
      <ul class="tab-group">
      ${this.tabsData.map(tab =>
        `<li class="tab${tab.active ? ' active' : ''}">
          <i class="icon ${tab.iconClass}"></i>${tab.title}
        </li>`
      ).join('')}
      </ul>
      <div class="tab-content-group">
      ${this.tabsData.map(tab =>
        `<div class="tab-content">${tab.content}</div>`
      ).join('')}
      <div>`;
    document.querySelector('.tabs').insertAdjacentHTML('beforeend', html);
  }
  // do something!
}
window.onload = function () {
  const tab = new Tab([
    {
      title: 'HTML',
      active: true,
      iconClass: 'fab fa-html5',
      content: `<strong>HTML(HyperText Markup Language)</strong> is the most basic building block of the Web.
        It describes and defines the content of a webpage along with the basic layout of the webpage.
        Other technologies besides HTML are generally used to describe a web page's
        appearance/presentation(CSS) or functionality/ behavior(JavaScript).`
    },
    {
      title: 'CSS',
      active: false,
      iconClass: 'fab fa-css3',
      content: `<strong>Cascading Style Sheets(CSS)</strong> is a stylesheet language used to describe
        the presentation of a document written in HTML or XML (including XML dialects
        such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen,
        on paper, in speech, or on other media.`
    },
    {
      title: 'JavaScript',
      active: false,
      iconClass: 'fab fa-js-square',
      content: `<strong>JavaScript(JS)</strong> is a lightweight interpreted or JIT-compiled programming
        language with first-class functions. While it is most well-known as the scripting
        language for Web pages, many non-browser environments also use it, such as Node.js,
        Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm,
        dynamic language, supporting object-oriented, imperative, and declarative
        (e.g. functional programming) styles.`
    }
  ]);
};