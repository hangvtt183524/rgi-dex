import Farms from 'views/Farms';

export async function getStaticProps() {
  return {
    props: {
      layoutProps: {
        backgroundImage: 'farms/background.png',
        backgroundOpacity: 0.5,
      },
    },
  };
}

export default Farms;
