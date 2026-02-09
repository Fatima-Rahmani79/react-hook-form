import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../validation/registerSchema";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log("Registration Data:", data);
    setSuccess(true);
    reset();
    setShowPassword(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {success && (
        <div className="success">
          Registration Successful!
        </div>
      )}

      {/* Full Name */}
      <div className="field">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          {...register("fullName")}
          autoComplete="name"
        />
        {errors.fullName && (
          <div className="error">{errors.fullName.message}</div>
        )}
      </div>

      {/* Email */}
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="name@example.com"
          {...register("email")}
          autoComplete="email"
        />
        {errors.email && (
          <div className="error">{errors.email.message}</div>
        )}
      </div>

      {/* Password */}
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register("password")}
          autoComplete="new-password"
        />

        <div className="helpRow">
          <label className="row small">
            <input
            className="checkbox"
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show Password
          </label>
          <span className="small">Minimum 8 characters</span>
        </div>

        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register("confirmPassword")}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword.message}</div>
        )}
      </div>

      {/* Terms */}
      <div className="field">
        <label className="row small">
          <input
          className="checkbox"
            type="checkbox"
            {...register("terms")}
          />
          Accept Terms & Conditions
        </label>

        {errors.terms && (
          <div className="error">{errors.terms.message}</div>
        )}
      </div>

      {/* Actions */}
      <div className="actions">
        <button
          className="primary"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Register"}
        </button>

        <button
          className="reset"
          type="button"
          onClick={() => {
            reset();
            setShowPassword(false);
            setSuccess(false);
          }}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
