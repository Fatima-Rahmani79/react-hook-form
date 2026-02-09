// FullName
// Email
// Password
// ConfirmPassword
// TermsAndCondition

import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  function onSubmit(data) {
    console.log("Register Submit:", {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });

    setSuccess("Registration Successful!");
  }

  function handleReset() {
    reset();
    setShowPassword(false);
    setSuccess("");
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Enter your full name..."
          {...register("fullName")}
          autoComplete="name"
        />
        {errors.fullName && (
          <div className="error">{errors.fullName.message}</div>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="name@example.com"
          {...register("email")}
          autoComplete="email"
        />
        {errors.email && <div className="error">{errors.email.message}</div>}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          placeholder="name@example.com"
          {...register("password")}
          autoComplete="new-password"
        />
        <div className="helpRow">
          <label className="row small" style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              className="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            Show Password
          </label>
          <span className="small">Min 8 characters</span>
        </div>
        {errors.password && (
          <div className="error">{errors.password.message}</div>
        )}
      </div>

      <div className="field">
        <label htmlFor="confirm">Confirm Password</label>
        <input
          id="confirm"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register("confirmedPassword")}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword.message}</div>
        )}
      </div>

      <div className="field">
        <label htmlFor="terms">Terms & Conditions</label>
        <input
          type="checkbox"
          className="checkbox"
        //   checked={}
          onChange={(e) => (e.target.checked)}
        />
        {errors.confirmPassword && (
          <div className="terms">{errors.terms.message}</div>
        )}
      </div>

      <div className="actions">
        <button className="primary" type="submit" disabled={!isValid || isSubmitting}>
            Register
        </button>
        <button className="reset" type="button" onClick={handleReset}>
            Reset
        </button>
      </div>
    </form>
  );
}
