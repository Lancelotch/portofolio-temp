import React from "react";
import { dummyPrivacyPolicy } from "../../dummy/dummyPrivacyPolicy";
import "./style.sass";
import strings from "../../localization/localization";

export default function PrivacyPolicy() {
  const dummy = dummyPrivacyPolicy.data;
  return (
    <div className="mp-privacy-policy">
      <h2>{strings.register_policy}</h2>
      <p> {dummy.kebijakanPrivasi.kebijakan}</p>
      <h3>{strings.use_of_cookies}</h3>
      <ul>
        {dummy.penggunaanCookie.map(cookie => {
          return <li>{cookie.cookie}</li>;
        })}
      </ul>
      <h3>{strings.user_choices}</h3>
      <ul>
        {dummy.pilihanPengguna.map(pengguna => {
          return <li>{pengguna.pilihan}</li>;
        })}
      </ul>
      <h3>{strings.storage_and_deletion_of_information}</h3>
      <p>{dummy.kebijakanPrivasi.penyimpanan}</p>
      <h3>{strings.privacy_policy_update}</h3>
      <p>{dummy.kebijakanPrivasi.pembaruan}</p>
      <h3>{strings.privacy_policy_update}</h3>
      <p>{dummy.kebijakanPrivasi.pembaruanPrivasi}</p>
    </div>
  );
}
