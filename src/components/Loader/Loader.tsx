import { ClipLoader } from 'react-spinners';

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
    <ClipLoader size={60} color="#3a7bfd" />
  </div>
);

export default Loader;
