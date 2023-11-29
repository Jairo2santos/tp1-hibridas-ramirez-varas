//CategoriaTag.jsx
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function CategoriaTag({ categoria }) {
  return (
    <Link  className="text-sm bg-indigo-100 text-indigo-900 py-1 px-2 rounded">
      {categoria}
    </Link>
  );
}

CategoriaTag.propTypes = {
  categoria: PropTypes.string.isRequired,
};

export default CategoriaTag;
