import { useState} from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ToggleSection({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 rounded-[12px] border border-borderColor bg-backPrimary">
      <h3
        className="cursor-pointer py-2.5 px-3.5 m-0 text-center text-[18px] font-bold text-clikColor"
        onClick={() => setOpen(!open)}
      >
        {title}
      </h3>
      {open && (
        <div className="force:rounded-b-[12px] py-2.5 px-3.5 bg-[#FFF8E1] border-t border-borderColor text-fontTertiary text-base text-center ">
          {children}
        </div>
      )}
    </div>
  );
}