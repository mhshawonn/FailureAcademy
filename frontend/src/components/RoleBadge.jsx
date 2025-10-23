const roleStyles = {
  student: 'bg-primary/15 text-primary',
  teacher: 'bg-emerald-500/15 text-emerald-300',
  admin: 'bg-rose-500/15 text-rose-300',
};

const RoleBadge = ({ role }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
      roleStyles[role] || 'bg-white/10 text-white/70'
    }`}
  >
    {role?.toUpperCase()}
  </span>
);

export default RoleBadge;
