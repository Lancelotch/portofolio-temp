import React from 'react';
import { dummyTermsCondition } from '../../dummy/dummyTermsCondition';
import "./style.sass";
import strings from '../../localization/localization';

export default function TermsCondition() {
    const dummy = dummyTermsCondition.data
    return (
        <div className="mp-terms-condition">
            <h2>{strings.terms_and_condition}</h2>
                <h3>{strings.preliminary}</h3>
            <ul>
                <li>{dummy.pendahuluanParagraphOne}</li>
                <li>{dummy.pendahuluanParagraphTwo}</li>
            </ul>
                <h3>{strings.terms_condition_modifications_and_terms_conditions}</h3>
            <ul>
                <li>{dummy.modifikasiPlatformOne}</li>
                <li>{dummy.modifikasiPlatformTwo}</li>
            </ul>
                <h3>{strings.terms_condition_monggopesen_service_order_policy}</h3>
            <ul>
                {dummy.kebijakanPemesanan.map(kebijakan => {
                    return <li>{kebijakan.kebijakan}</li>
                })}
            </ul>
                <h3>{strings.terms_condition_copyright}</h3>
            <ul>
                <li>{dummy.hackCiptaOne}</li>
                <li>{dummy.hackCiptaTwo}</li>
            </ul>
                <h3>{strings.price}</h3>
            <ul>
                <li>{dummy.priceOne}</li>
                <li>{dummy.priceTwo}</li>
            </ul>
                <h3>{strings.terms_condition_shipping_price_calculation}</h3>
                    <p>{dummy.perhitungan}</p>
                <h3>{strings.terms_condition_proses_custom_clearance}</h3>
                    <p>{dummy.prosesCustom}</p>
                        <h3>{strings.terms_condition_prohibited_items}</h3>
                            <p>{strings.terms_condition_prohibited_text}</p>
                                <ul>
                                    {dummyTermsCondition.data.barangDilarang.map(custom => {
                                        return <li>{custom.barang}</li>
                                    })}
                                </ul>
            <h3>{strings.terms_condition_restricted_goods}</h3>
                <p>{strings.terms_condition_restricted_items_heading}</p>
                    <p>{strings.terms_condition_restricted_items}</p>
                        <ul>
                            {dummyTermsCondition.data.barangDibatasi.map(barang => {
                                return <li>{barang.dibatasi}</li>
                            })}
                        </ul>
            <h3>{strings.terms_condition_retur_return_label}</h3>
                <ul>
                    {dummyTermsCondition.data.kebijakanReturReturn.map(kebijakan => {
                        return <li>{kebijakan.returReturn}</li>
                    })}
                </ul>
            <h3>{strings.terms_condition_electronic_communication}</h3>
                <p>{dummyTermsCondition.data.komunikasiElekTronik}</p>
                    <h3>{strings.terms_condition_applicable_law}</h3>
                        <p>{dummyTermsCondition.data.hukum}</p>
        </div>
    );
}; 