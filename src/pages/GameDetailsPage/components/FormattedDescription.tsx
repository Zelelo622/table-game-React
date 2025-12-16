interface FormattedDescriptionProps {
  text: string;
  className?: string;
}

export const FormattedDescription: React.FC<FormattedDescriptionProps> = ({
  text,
  className = ""
}) => {
  const paragraphs = text.split("\\n\\n").filter((p) => p.trim() !== "");
  console.log(paragraphs);

  if (paragraphs.length === 0) return null;

  return (
    <div className={className}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4 last:mb-0">
          {paragraph}
        </p>
      ))}
    </div>
  );
};
