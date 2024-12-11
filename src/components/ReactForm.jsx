import { useForm } from "react-hook-form";
export default function ReactForm() {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input {...register("name", { required: true })} />
      {errors.name && <p style={{ color: "red" }}>Name is required</p>}

      <label>Email:</label>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email format"
          }
        })}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

      <button type='submit'>Submit</button>
    </form>
  );
}
