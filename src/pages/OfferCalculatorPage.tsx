import { useCallback, useEffect, useMemo } from "react";
import fetchProducts from "../api/fetchProducts";
import PreparedOfferResult from "../components/calculator/PreparedOfferResult";
import CheckboxList from "../components/ui/CheckboxList";
import Panel from "../components/ui/Panel";
import Select, { SelectOption } from "../components/ui/Select";
import TwoColumnLayout from "../components/ui/TwoColumnLayout";
import translations from "../config/translations";

import useCalculatorActions from "../hooks/useCalculatorActions";
import useCalculatorState from "../hooks/useCalculatorState";
import { prepareOffer } from "../services/offerCalculator";
import { validateRequestedProduct } from "../services/offerCalculatorValidation";

const OfferCalculatorPage = () => {
  const { setProductData, setSelectedProducts, setSelectedYear, setValidationProductResult, setPreparedOffer } =
    useCalculatorActions();
  const { productData, calucaltorFormData, validationResult } = useCalculatorState();
  const { availableYears } = productData;

  useEffect(() => {
    const productData = fetchProducts();
    setProductData(productData);
    const firstYearOnTheList = productData.availableYears[0].toString();
    setSelectedYear({ title: firstYearOnTheList, value: firstYearOnTheList });
  }, []);

  const products = useMemo(() => {
    return productData.products.map((product) => ({ value: product.id, title: product.name }));
  }, [productData]);

  const yearOptions = useMemo(() => {
    return availableYears.map((year) => ({ title: year.toString(), value: year.toString() }));
  }, [availableYears]);

  const getErrorMessages = () =>
    validationResult.validationResults
      .filter((result) => !result.success)
      .map((result) => result.message)
      .join(", ");

  const onPrepareOfferClick = () => {
    const { selectedYear, selectedProducts } = calucaltorFormData;
    const selectedYearValue = availableYears.find((year) => year.toString() === selectedYear?.value);
    if (!selectedYearValue) return;

    const productsValidationResult = validateRequestedProduct(productData, selectedProducts);
    setValidationProductResult(productsValidationResult);

    if (!productsValidationResult.hasAnyError) {
      const offer = prepareOffer(productData, selectedProducts, selectedYearValue);

      setPreparedOffer(offer);
    }
  };

  const onSelectedProductsChangeHandle = useCallback(
    (selectedProducts: string[]) => {
      setSelectedProducts(selectedProducts);
    },
    [setSelectedProducts]
  );

  const onSelectedYearChangeHandle = useCallback(
    (selectedYear: SelectOption | undefined) => {
      if (selectedYear) {
        setSelectedYear(selectedYear);
      }
    },
    [setSelectedYear]
  );

  return (
    <Panel header={translations.pageTitle}>
      <TwoColumnLayout
        firstPanel={
          <div>
            <div className="field">
              <label className="label">{translations.selectProducts}:</label>
              <CheckboxList
                availableValues={products}
                checkedValues={calucaltorFormData.selectedProducts}
                onChange={onSelectedProductsChangeHandle}
              />
              {validationResult.hasAnyError && <span className="tag is-danger is-light">{getErrorMessages()}</span>}
            </div>
            <div className="field">
              <label className="label">{translations.selectYear}:</label>
              <Select
                options={yearOptions}
                selectedOption={calucaltorFormData.selectedYear}
                onSelectedOptionChange={onSelectedYearChangeHandle}
              />
            </div>
            <button className="button is-primary" onClick={onPrepareOfferClick}>
              {translations.prepareOffer}
            </button>
          </div>
        }
        secondPanel={<PreparedOfferResult />}
      />
    </Panel>
  );
};

export default OfferCalculatorPage;
