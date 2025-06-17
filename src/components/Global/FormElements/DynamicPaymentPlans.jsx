import { useEffect, useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import TextInput from "./TextInput/TextInput";
import Button from "../Button/Button";
import { getMemberGroupDisplayName, getMemberGroupCurrency, getDefaultPrice } from "~/constants/conferences";
import { formatCurrency } from "~/utilities/formatCurrency";

const DynamicPaymentPlans = ({ selectedMemberGroups = [], isConference = false }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [isPaid, setIsPaid] = useState(false);

  // Use useMemo for paymentPlans to avoid dependency issues in useEffect
  const paymentPlans = useMemo(() => watch("paymentPlans") || {}, [watch]);
  useEffect(() => {
    // Auto-detect if event is paid based on existing payment plans
    const hasPaymentPlans = Object.keys(paymentPlans).length > 0;
    setIsPaid(hasPaymentPlans);
    // Set the form value for isPaid
    setValue("isPaid", hasPaymentPlans);
  }, [paymentPlans, setValue]);

  // Generate payment plan fields based on selected member groups
  const generatePaymentPlanFields = () => {
    if (!isPaid || selectedMemberGroups.length === 0) return null;

    const fieldsToRender = [];

    if (isConference) {
      // Conference with multiple registration periods
      ["Regular", "Late"].forEach((period) => {
        fieldsToRender.push(
          <div key={period} className="mb-6">
            <h4 className="font-medium text-sm text-gray-700 mb-3">{period} Registration Prices</h4>
            {selectedMemberGroups.map((group) => {
              const fieldKey = `${group}_${period}`;
              const currency = getMemberGroupCurrency(group);
              const defaultPrice = getDefaultPrice(group, period);

              return (
                <div key={fieldKey} className="flex items-center gap-8 mb-3">
                  <p className="text-sm font-medium flex-shrink-0 w-1/3">
                    {getMemberGroupDisplayName(group)} - {period} ({currency})
                  </p>
                  <TextInput
                    label={`paymentPlans.${fieldKey}`}
                    type="number"
                    showTitleLabel={false}
                    register={register}
                    errors={errors}
                    required={isPaid}
                    placeholder={`e.g. ${formatCurrency(defaultPrice, currency)}`}
                    className="w-1/4"
                  />
                </div>
              );
            })}
          </div>
        );
      });
    } else {
      // Regular event pricing
      fieldsToRender.push(
        <div key="regular" className="mb-6">
          {selectedMemberGroups.map((group) => {
            const currency = getMemberGroupCurrency(group);
            const defaultPrice = getDefaultPrice(group);

            return (
              <div key={group} className="flex items-center gap-8 mb-3">
                <p className="text-sm font-medium flex-shrink-0 w-1/3">
                  Price for {getMemberGroupDisplayName(group)} ({currency})
                </p>
                <TextInput
                  label={`paymentPlans.${group}`}
                  type="number"
                  showTitleLabel={false}
                  register={register}
                  errors={errors}
                  required={isPaid}
                  placeholder={`e.g. ${formatCurrency(defaultPrice, currency)}`}
                  className="w-1/4"
                />
              </div>
            );
          })}
        </div>
      );
    }

    return fieldsToRender;
  };

  // Auto-generate payment plans when member groups change
  useEffect(() => {
    if (isPaid && selectedMemberGroups.length > 0) {
      const newPaymentPlans = {};

      selectedMemberGroups.forEach((group) => {
        if (isConference) {
          ["Regular", "Late"].forEach((period) => {
            const fieldKey = `${group}_${period}`;
            // Only set default if field doesn't already have a value
            if (!paymentPlans[fieldKey]) {
              newPaymentPlans[fieldKey] = "";
            }
          });
        } else {
          // Only set default if field doesn't already have a value
          if (!paymentPlans[group]) {
            newPaymentPlans[group] = "";
          }
        }
      });

      // Update form values
      Object.keys(newPaymentPlans).forEach((key) => {
        setValue(`paymentPlans.${key}`, newPaymentPlans[key]);
      });
    }
  }, [selectedMemberGroups, isPaid, isConference, setValue, paymentPlans]);
  // Clear payment plans when switching to free
  const handleTogglePayment = () => {
    const newIsPaid = !isPaid;

    if (isPaid) {
      // Clearing payment plans
      Object.keys(paymentPlans).forEach((key) => {
        setValue(`paymentPlans.${key}`, undefined);
      });
    }

    setIsPaid(newIsPaid);
    setValue("isPaid", newIsPaid);
  };

  return (
    <div className="col-span-2 my-4">
      <div className="flex items-center gap-8 mb-4">
        <h3 className="font-semibold text-sm">Payment Plans</h3>
        <Button
          type="button"
          variant="outlined"
          label={isPaid ? "Make Free Event" : "Add Payment Plans"}
          onClick={handleTogglePayment}
        />
      </div>

      {selectedMemberGroups.length === 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Please select member groups first to configure payment plans.
          </p>
        </div>
      )}

      {isPaid && selectedMemberGroups.length > 0 && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Payment plans will be generated for:{" "}
              {selectedMemberGroups.map((group) => getMemberGroupDisplayName(group)).join(", ")}
            </p>
          </div>
          {generatePaymentPlanFields()}
        </div>
      )}

      {/* Hidden field to track isPaid status */}
      <input type="hidden" {...register("isPaid")} value={isPaid} />
    </div>
  );
};

export default DynamicPaymentPlans;
