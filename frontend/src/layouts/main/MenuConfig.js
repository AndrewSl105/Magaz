import BookIcon from '@material-ui/icons/Book';
import CategoryIcon from '@material-ui/icons/Category';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------

const menuConfig = [
  {
    title: 'Catalog',
    path: '/categories',
    icon: <CategoryIcon />,
    children: [
      {
        subheader: 'Верхняя легкая одежда',
        items: [
          { title: "Сарафаны", path: '/' },
          { title: "Платья", path: '' },
          { title: "Туники", path: '' },
          { title: "Кардиганы", path: '' },
          { title: "Комбинезоны", path: '' },
          { title: "Кофты", path: '' },
          { title: "Свитшоты", path: '' },
          { title: "Толстовки", path: '' },
          { title: "Худи", path: '' },
          { title: "Шорты", path: '' },
          { title: "Брюки", path: '' },
          { title: "Джинсы", path: '' },
          { title: "Майки", path: '' },
          { title: "Майки, топы", path: '' },
          { title: "Рубашки", path: '' },
          { title: "Блузы", path: '' },
        ]
      },
      {
        subheader: 'Верхняя Одежда',
        items: [
          { title: "Зимние куртки", path: '/' },
          { title: "Демисезонные куртки", path: '' },
          { title: "Анораки", path: '' },
          { title: "Пуховики", path: '' },
          { title: "Бомберы", path: '' },
          { title: "Парки", path: '' }
        ]
      },
      {
        subheader: 'Белье',
        items: [
          { title: "Боди", path: '/' },
          { title: "Комплекты белья", path: '' },
          { title: "Корсеты, бюстье", path: '' },
          { title: "Нижнее белье", path: '' },
          { title: "Пижамы женские", path: '' },
          { title: "Бюстгальтеры", path: '' },
          { title: "Женские трусы", path: '' }
        ]
      },
      {
        subheader: 'Термо Одежда',
        items: [
          { title: "Теплые жилеты", path: '/' },
          { title: "Термокостюмы", path: '' },
          { title: "Термолонгсливы", path: '' },
          { title: "Термолосины", path: '' },
          { title: "Термоноски женские", path: '' },
          { title: "Термотрусы", path: '' },
        ]
      },
      {
        subheader: 'Для спорта',
        items: [
          { title: "Спортивные брюки", path: '/' },
          { title: "Спортивные костюмы", path: '' },
          { title: "Спортивные кофты", path: '' },
          { title: "Спортивные шорты", path: '' },
          { title: "Лыжные брюки", path: '' },
          { title: "Лыжные куртки", path: '' },
        ]
      },
      {
        subheader: 'Другая одежда',
        items: [
          { title: "Домашняя одежда", path: '/' },
          { title: "Купальники и пляжная одежда", path: '' },
          { title: "Портупеи", path: '' },
          { title: "Ночные рубашки", path: '' },
          { title: "Носки", path: '' },
        ]
      }
    ]
  },
  {
    title: 'Favourites',
    icon: <FavoriteIcon />,
    path: PATH_PAGE.components
  },
  {
    title: 'Blog',
    icon: <BookIcon />,
    path: PATH_DOCS,
  },
  {
    title: 'Log In',
    icon: <AccountCircleIcon />,
    path: PATH_AUTH.login,
  }
];

export default menuConfig;
