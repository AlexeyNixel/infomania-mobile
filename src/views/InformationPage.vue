<template>
  <div class="information container">
    <div class="information-title">
      Сведения об организации, осуществляющей образовательную деятельность
    </div>
    <router-link
      :to="{
        name: 'entry',
        params: { slug: '2021-10-12-osnovnye-svedenija' },
      }"
      class="information-item"
    >
      Основные сведения
    </router-link>
    <router-link
      :to="{
        name: 'entry',
        params: { slug: 'struktura-biblioteki-03-16-22-10-22' },
      }"
      class="information-item"
    >
      Структура и органы управления образовательной организацией
    </router-link>
    <router-link
      :to="{ name: 'entry', params: { slug: '2021-10-12-dokumenty' } }"
      class="information-item"
    >
      Документы
    </router-link>
    <router-link
      :to="{ name: 'entry', params: { slug: '2021-11-12-obrazovanie' } }"
      class="information-item"
    >
      Образование
    </router-link>
    <router-link
      :to="{
        name: 'entry',
        params: { slug: '2021-11-12-obrazovatelnye-standarty' },
      }"
      class="information-item"
    >
      Образовательные стандарты
    </router-link>
    <router-link
      :to="{
        name: 'entry',
        params: {
          slug: '2021-11-13-rukovodstvo-pedagogicheskij-nauchno-pedagogicheskij-sostav',
        },
      }"
      class="information-item"
    >
      Руководство. Педагогический (научно-педагогический) состав
    </router-link>
    <router-link
      :to="{
        name: 'entry',
        params: {
          slug: '2021-11-13-materialno-tehnicheskoe-obespechenie-i-osnaschennost-obrazovatelnogo-protsessa',
        },
      }"
      class="information-item"
    >
      Материально-техническое обеспечение и оснащенность образовательного
      процесса
    </router-link>
    <router-link
      :to="{
        name: 'entry',
        params: {
          slug: '2021-11-13-stipendii-i-inye-vidy-materialnoj-podderzhki',
        },
      }"
      class="information-item"
    >
      Стипендии и иные виды материальной поддержки
    </router-link>
    <router-link
      :to="{
        name: 'entry',
        params: { slug: '2021-11-13-platnye-obrazovatelnye-uslugi' },
      }"
      class="information-item"
    >
      Платные образовательные услуги
    </router-link>
    <router-link
      :to="{
        name: 'entry',
        params: { slug: '2021-11-13-finansovo-hozjajstvennaja-dejatelnost' },
      }"
      class="information-item"
    >
      Финансово хозяйственная деятельность
    </router-link>
    <router-link
      :to="{
        name: 'entry',
        params: { slug: '2021-11-13-vakantnye-mesta-dlja-priema-perevoda' },
      }"
      class="information-item"
    >
      Вакантные места для приема (перевода)
    </router-link>
    <router-link
      :to="{
        name: 'entry',
        params: { slug: '2021-11-13-arhiv-meroprijatij-uchebnogo-tsentra' },
      }"
      class="information-item"
    >
      Архив мероприятий
    </router-link>
    <router-link
      :to="{
        name: 'entry',
        params: { slug: '2021-11-13-plany-realizatsii-programm-dpo' },
      }"
      class="information-item"
    >
      Планы реализации программ ДПО
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.information {
  &-title {
    font-weight: bold;
    font-size: var(--title-font-size);
    color: var(--font-color);
  }

  &-item {
    padding: 2px 0;
    display: block;
    text-decoration: none;
    color: var(--font-color);
    font-size: var(--regular-font-size);
    font-weight: bold;
    &:nth-child(odd) {
      color: var(--font-color-alt);
    }
  }
}
</style>
