<script setup lang="ts"></script>

<template>
  <footer class="footer">
    <p class="footer__item footer__address">
      <font-awesome-icon
        class="footer__icon"
        :icon="['fass', 'location-dot']"
      />
      г. Новосибирск, Красный проспект, 26
    </p>
    <p class="footer__item footer__phone">
      <font-awesome-icon class="footer__icon" :icon="['fas', 'phone']" />
      (383) 210-10-53
    </p>

    <p class="footer__social">
      <a
        class="footer__link"
        target="_blank"
        href="https://www.youtube.com/user/noub77nsk"
      >
        <font-awesome-icon
          class="footer__social-icon"
          icon="fa-brands fa-youtube"
        />
      </a>
      <a class="footer__link" target="_blank" href="https://vk.com/oub_nsk">
        <font-awesome-icon class="footer__social-icon" icon="fa-brands fa-vk" />
      </a>
      <a
        class="footer__link"
        target="_blank"
        href="https://ok.ru/group/70000001168881"
      >
        <font-awesome-icon
          class="footer__social-icon"
          icon="fa-brands fa-odnoklassniki"
        />
      </a>
    </p>
    <p class="footer__item footer__copyright">
      © Новосибирская областная молодежная библиотека 2009-2023
    </p>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--footer-bg-color);
  border-radius: 10px 10px 0 0;
  padding: 10px;
  font-size: var(--regular-font-size);
  margin-top: 1vh;
  color: white;

  &__link {
    color: white;
  }

  &__item {
    margin: 1vh 0;
    display: flex;
    align-items: center;
  }

  &__icon {
    padding: 10px;
    background: var(--icon-bg-color);
    border-radius: 10px;
    margin-right: 10px;
  }

  &__social-link {
    font-size: 1rem;
  }

  &__social-icon {
    width: 25px;
    height: 25px;
    padding: 5px;
    background: var(--icon-bg-color);
    border-radius: 10px;
    margin-right: 1vw;
  }

  &__copyright {
    color: white;
  }
}
</style>
