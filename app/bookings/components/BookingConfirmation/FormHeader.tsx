export interface FormHeaderProps {
  title?: string;
  description?: string;
}

export default function FormHeader({
  title = 'Your Estimate',
  description = "Please review the details you require for your home cleaning service.",
}: FormHeaderProps) {
  return (
    <div className="mb-8">
      <h2 className="heading-h2 font-bold text-primary mb-2">
        {title}
      </h2>
      <p className="body-text">
        {description}
      </p>
    </div>
  );
}
