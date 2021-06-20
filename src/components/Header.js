import Button from './Button';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const Header = ({ title, showAdd, onAdd }) => {
    const location = useLocation();

    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && (
                <Button
                    color={showAdd ? 'green' : 'red'}
                    onClick={onAdd}
                >{showAdd ? 'Add' : 'Close'}</Button>
            )}
        </header>
    )
}

Header.defaultProps = {
    title: 'TODO List',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header;