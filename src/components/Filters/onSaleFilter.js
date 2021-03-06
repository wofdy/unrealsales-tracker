import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';

import { setFilters } from '../../actions/appActions';
import { selectFilters } from '../../selectors/filters';

const mapDispatchToProps = (dispatch) => {
    return {
        setFilters: (filters) => {
            dispatch(setFilters(filters));
        }
    };
};
const mapStateToProps = (state) => {
    const filters = selectFilters(state);

    return {
        filters,
    }
};

class OnSaleFilter extends PureComponent {
    render() {
        return (
            <Form.Check
                inline
                label="Show only on sale"
                onChange={this.handleSaveFilter.bind(this)}
                type="checkbox"
                id="advanced-on-sale"
            />
        );
    }

    handleSaveFilter(event) {
        const { setFilters, filters } = this.props;

        let newFilters = {
            ...filters,
            onSaleFilter: {
                'discounted': event.currentTarget.checked,
            }
        }
        if (!event.currentTarget.checked) {
            delete newFilters.onSaleFilter;
        }

        setFilters(newFilters);

    }
}

export default OnSaleFilter = connect(mapStateToProps, mapDispatchToProps)(OnSaleFilter);