import { useState } from "react";
import CheckboxList from "../components/CheckboxList";
import Panel from "../components/Panel";
import Select, { SelectOption } from "../components/Select";
import TwoColumnLayout from "../components/TwoColumnLayout";
import { db, prepareOffer } from "../model";

const products = db.products.map((product) => ({ value: product.id, title: product.name }));
const years = db.availableYears;

const yearOptions = years.map((year) => ({ title: year.toString(), value: year.toString() }));

const OfferCalculatorPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<SelectOption | undefined>(yearOptions[0]);

  const onPrepareOfferClick = () => {
    const selectedYearValue = db.availableYears.find((year) => year.toString() === selectedYear?.value);
    if (!selectedYearValue) return;

    const offer = prepareOffer(selectedProducts, selectedYearValue);
    console.log(offer);
  };

  return (
    <Panel header={"TeleCom Offer Calculator"}>
      <TwoColumnLayout
        firstPanel={
          <div>
            <div className="field">
              <label className="label">Please select products:</label>
              <CheckboxList
                availableValues={products}
                checkedValues={selectedProducts}
                onChange={setSelectedProducts}
              />
            </div>
            <div className="field">
              <label className="label">Please select year:</label>
              <Select options={yearOptions} selectedOption={selectedYear} onSelectedOptionChange={setSelectedYear} />
            </div>
            <button className="button is-primary" onClick={onPrepareOfferClick}>
              Prepare Offer
            </button>
          </div>
        }
        secondPanel={<div>Result</div>}
      />
    </Panel>
  );
};

export default OfferCalculatorPage;
