import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import icons from "~/assets/js/icons";
import BackButton from "~/components/Global/BackButton/BackButton";
import Button from "~/components/Global/Button/Button";
import Select from "~/components/Global/FormElements/Select/Select";
import TextArea from "~/components/Global/FormElements/TextArea/TextArea";
import TextInput from "~/components/Global/FormElements/TextInput/TextInput";
import PageHeader from "~/components/Global/PageHeader/PageHeader";
import { useCreateProductMutation, useUpdateProductBySlugMutation } from "~/redux/api/productsApi";

const ADDITIONAL_IMAGE_LIMIT = 4;
const CATEGORIES = ["Journals & Magazines", "Customized wears", "Publications (Books)", "Others"];

const CreateProductPage = () => {
  const navigate = useNavigate();
  const product = useLocation().state?.products;
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [editProduct, { isLoading: isUpdating }] = useUpdateProductBySlugMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm({ mode: "all" });

  useEffect(() => {
    if (product) {
      ["name", "description", "price", "category", "stock", "brand"].forEach((key) => {
        setValue(key, product?.[key]);
      });
      setImage(product.featuredImageUrl);
    } else {
      reset();
      setImage(null);
    }
  }, [product, setValue, reset]);

  const [featuredImage, setFeaturedImage] = useState();
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState(false);
  const [additionalImages, setAdditionalImages] = useState(1);

  const handlePreview = (e) => {
    const file = e.target.files[0];
    setFeaturedImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onabort = () => {};
    reader.onerror = (err) => console.log("Error: ", err);
    reader.readAsDataURL(file);
  };

  const onSubmit = (payload) => {
    if (!product && !featuredImage) return toast.error("Featured image is required");
    payload = {
      ...payload,
      featuredImage,
      additionalImages: JSON.stringify(
        payload.additionalImages
          .map((item, i) =>
            i < additionalImages
              ? { name: colors ? item.name : "Additional " + (i + 1), color: item.color || null }
              : false
          )
          .filter(Boolean)
      ),
      additionalImageFiles: payload.additionalImages
        .map((item, i) => (i < additionalImages ? item.file[0] : null))
        .filter(Boolean),
    };

    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    });

    if (!product) {
      createProduct(formData)
        .unwrap()
        .then(() => {
          toast.success("Product ADDED successfully");
          navigate("/products");
        });
    } else {
      editProduct({ body: formData, slug: product?.slug })
        .unwrap()
        .then(() => {
          toast.success("Product UPDATED successfully");
        });
    }
  };

  return (
    <div>
      <BackButton label="Back to Products List" />

      <div className="bg-white max-w-screen-lg mx-auto p-6 shadow-sm mt-6 rounded-lg">
        <PageHeader title={product ? "Edit Product" : "Create Product"} />

        <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-3 mt-4">
          <div className="col-span-2">
            <p className="text-sm font-semibold mb-1">
              Featured Image <span className="text-error">*</span>
            </p>
            <div className="inline-block">
              <label htmlFor="image" className="text-primary text-sm font-medium underline cursor-pointer">
                {image ? (
                  <img src={image} alt="" className="size-40 rounded-xl" />
                ) : (
                  <span className="size-40 bg-onPrimary rounded-xl inline-flex items-center justify-center text-5xl text-primary">
                    {icons.image}
                  </span>
                )}
              </label>
              <input type="file" accept="image/*" hidden id="image" name="image" onChange={handlePreview} />
            </div>
          </div>
          <div className="col-span-2">
            <TextInput label="name" register={register} required errors={errors} />
          </div>
          <div className="col-span-2">
            <TextArea label="description" register={register} required errors={errors} rows={3} />
          </div>
          <TextInput label="price" type="number" register={register} required errors={errors} />
          <Select
            label="category"
            control={control}
            required
            errors={errors}
            options={CATEGORIES.map((x) => ({ label: x, value: x }))}
          />
          <TextInput
            title="Available Quantity"
            label="stock"
            type="number"
            register={register}
            required
            errors={errors}
          />

          <TextInput label="brand" register={register} errors={errors} />

          <div className="col-span-2">
            <TextInput
              title="Available Sizes (separated by comma)"
              label="sizes"
              placeholder="e.g. S, M, L, XL, XXL"
              register={register}
              errors={errors}
            />
          </div>

          <div className="col-span-2 my-4 flex flex-col">
            <h5 className="flex items-center gap-6 text-sm font-semibold">
              Additional Images{" "}
              <button type="button" className="text-primary" onClick={() => setColors(!colors)}>
                {colors ? "Remove Colors" : "Add Color Variants"}
              </button>
            </h5>
            {colors && (
              <div className="grid grid-cols-4 gap-3 mt-2">
                <h5 className="text-gray-600 font-medium uppercase text-xs">Color Name</h5>
                <h5 className="text-gray-600 font-medium uppercase text-xs">Select Color</h5>
                <h5 className="text-gray-600 font-medium uppercase text-xs">{colors ? "Color Image" : "Image File"}</h5>
              </div>
            )}
            {[...Array(additionalImages)].map((_, i) => (
              <div key={i} className={`grid gap-3 mt-2 ${colors ? "grid-cols-4" : "grid-cols-2"}`}>
                {colors && (
                  <>
                    <div>
                      <TextInput
                        label={`additionalImages[${i}].name`}
                        register={register}
                        errors={errors}
                        showTitleLabel={false}
                      />
                    </div>
                    <div>
                      <TextInput
                        label={`additionalImages[${i}].color`}
                        type="color"
                        register={register}
                        errors={errors}
                        showTitleLabel={false}
                      />
                    </div>
                  </>
                )}
                <div className="col-span-2">
                  <TextInput
                    type="file"
                    label={`additionalImages[${i}].file`}
                    title={`Image ${i + 1}`}
                    accept="image/*"
                    register={register}
                    errors={errors}
                    showTitleLabel={!colors}
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-3">
              {additionalImages < ADDITIONAL_IMAGE_LIMIT && (
                <Button
                  label="Add Another Image"
                  variant="outlined"
                  onClick={() => setAdditionalImages((prev) => prev + 1)}
                />
              )}
              {additionalImages > 1 && (
                <Button label="Remove" variant="text" onClick={() => setAdditionalImages((prev) => prev - 1)} />
              )}
            </div>
          </div>

          <Button label="Submit" type="submit" loading={isCreating || isUpdating} className="mt-2 col-start-2" />
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
