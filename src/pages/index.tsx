import { type NextPage } from 'next'
import Head from 'next/head'
import { CatalogCategories } from '~/components/modules/catalog/catalog'
import { RecentOpened } from '~/components/modules/recentOpened/recentOpened'
import { useTranslate } from '~/components/hooks/useTrans'

const Home: NextPage = () => {
  const { title } = useTranslate({ keys: ['title'] })

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='home page' />
      </Head>
      <div className='mt-2  flex gap-2'>
        <div className=' hidden h-40 min-w-[224px] md:block'>
          <CatalogCategories />
        </div>
        <div className='flex flex-col gap-2'>
          <p className=' rounded bg-white p-2'>
            Рады представить наш fullstack e-commerce проект, созданный с
            использованием следующих технологий: Nextjs, Reactjs, Tailwind,
            Prisma, trpc, next-auth и т.д.
          </p>
          <p className=' rounded bg-white p-2'>
            Наш проект - это онлайн-магазин, который предоставляет пользователю
            возможность легко найти и заказать товары онлайн. У нас есть удобная
            функция фильтрации товаров и простой поиск, чтобы помочь
            пользователю найти нужные товары.
          </p>
          <p className=' rounded bg-white p-2'>
            Для удобства наших пользователей мы также добавили систему
            авторизации, где пользователь может использовать свой существующий
            аккаунт Google для входа.
          </p>
        </div>
      </div>
      <RecentOpened />
    </>
  )
}

export default Home
