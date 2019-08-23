import React from 'react';
import strings from '../../localization/localization';
import variantItems from '../../library/variantItems';

const TableProductOrder = props => {
    const { informations, note, quantity } = props
    return (
        <table>
            <tbody>
                <tr>
                    <td style={{ width: 70 }}>
                        <p>
                            {strings.varian}
                        </p>
                    </td>
                    <td style={{ width: 20 }}>
                        <p>
                            :
                        </p>
                    </td>
                    <td>
                        <p>
                            {variantItems(informations)}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style={{ width: 70, verticalAlign: "unset" }}>
                        <p>
                            {strings.note}
                        </p>
                    </td>
                    <td style={{ verticalAlign: "unset", width: 20 }}>
                        <p>
                            :
                        </p>
                    </td>
                    <td>
                        <p>
                        {note && note.charAt(0).toUpperCase() + note.substring(1)}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style={{ width: 70 }}>
                        <p className="product-order__quantity">
                            {strings.total}
                        </p>
                    </td>
                    <td style={{ width: 20 }}>
                        <p>
                            :
                        </p>
                    </td>
                    <td>
                        <p className="product-order__quantity">
                            {quantity}&nbsp;{strings.pcs}
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default TableProductOrder;