import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox='0 0 280 500'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <circle cx='139' cy='133' r='125' />
    <rect x='0' y='275' rx='8' ry='8' width='280' height='25' />
    <rect x='0' y='333' rx='11' ry='11' width='280' height='79' />
    <rect x='0' y='439' rx='10' ry='10' width='95' height='30' />
    <rect x='129' y='429' rx='26' ry='26' width='152' height='45' />
  </ContentLoader>
);

export default Skeleton;
