export interface FormHeaderProps {
  title?: string;
  description?: string;
}

export default function FormHeader({
  title = 'Your Estimate',
  description = "Review your estimated costs and hours below. Then enter your details and we'll contact you within 24 hours to confirm and schedule your booking.",
}: FormHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary font-poppins mb-2">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 font-inter">
        {description}
      </p>
    </div>
  );
}
