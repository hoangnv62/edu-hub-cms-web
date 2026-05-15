// Hiển thị lên UI — nhận long (ms) → "yyyy/mm/dd hh:mm"
export const formatDateTime = (value) => {
  if (value == null) return '—';
  const d = new Date(value);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
};

// Gửi lên backend — nhận dayjs object hoặc long (ms) → "yyyy-MM-dd HH:mm"
export const toApiDateTime = (value) => {
  if (!value) return null;
  const d = value?.toDate ? value.toDate() : new Date(value);
  if (isNaN(d.getTime())) return null;
  const yyyy = d.getFullYear();
  const MM = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const HH = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}`;
};
