const fs = require('fs');

let content = fs.readFileSync('src/components/AdminModal.tsx', 'utf-8');

// We need to add the import for useAdmin
content = content.replace("import { motion, AnimatePresence } from 'motion/react';", "import { motion, AnimatePresence } from 'motion/react';\nimport { useAdmin } from '../context/AdminContext';");

// Inside AdminModal, get the context:
content = content.replace(
  "export default function AdminModal({ isOpen, onClose }: AdminModalProps) {",
  `export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
  const { footerData, setFooterData } = useAdmin();
  const [localData, setLocalData] = useState(footerData);

  // Sync local data when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setLocalData(footerData);
    }
  }, [isOpen, footerData]);`
);

// We need to update handleSave
content = content.replace(
  "  const handleSave = () => {",
  `  const handleSave = () => {
    setFooterData(localData);`
);

fs.writeFileSync('src/components/AdminModal.tsx', content);
