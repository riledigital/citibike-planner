import Head from 'next/head'

const Title = ({children}) => {
  return (
      <>
          <Head>
              <title>Citi Bike Planner • {children}</title>
          </Head>
      </>
  )
}

export default Title