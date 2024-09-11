import {
  ColumnSpacingIcon,
  FilePlusIcon,
  GlobeIcon,
  ImageIcon,
} from '@radix-ui/react-icons';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@vctrl/shared/components';

interface UploadInfoDialogProps {
  open: boolean;
  onClose: () => void;
}

const UploadInfoDialog = ({ open, onClose }: UploadInfoDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[425px] w-[calc(100vw-2rem)] left-50% -translate-x-1/2">
        <DialogHeader>
          <DialogTitle>3D Editor Info</DialogTitle>
          <DialogDescription>
            A quick overview our 3D asset support, including upload formats and
            optimization features.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-7 items-center gap-4">
            <FilePlusIcon className="h-6 w-6 text-primary col-span-1" />
            <div className="col-span-6">
              <h3 className="font-semibold">Supported 3D Formats</h3>
              <p className="text-sm text-muted-foreground">
                glTF, glTF-Draco, glTF-embedded, glTF + textures, USDZ (USDA),
                OBJ
              </p>
            </div>
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <ImageIcon className="h-6 w-6 text-primary col-span-1" />
            <div className="col-span-6">
              <h3 className="font-semibold">Texture Support</h3>
              <p className="text-sm text-muted-foreground">
                PNG and JPG textures have been tested and are fully supported
              </p>
            </div>
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <ColumnSpacingIcon className="h-6 w-6 text-primary col-span-1" />
            <div className="col-span-6">
              <h3 className="font-semibold">Export & Optimization</h3>
              <p className="text-sm text-muted-foreground">
                Export and optimize your 3D assets in all supported formats
              </p>
            </div>
          </div>
          <div className="grid grid-cols-7 items-center gap-4">
            <GlobeIcon className="h-6 w-6 text-primary col-span-1" />
            <div className="col-span-6">
              <h3 className="font-semibold">Web-Ready Assets</h3>
              <p className="text-sm text-muted-foreground">
                Our goal is to make your 3D assets fully optimized for web use
              </p>
            </div>
          </div>
        </div>
        <DialogDescription className="text-xs text-muted-foreground">
          For more detailed information on file preparation and best practices,
          please refer to our documentation.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default UploadInfoDialog;
