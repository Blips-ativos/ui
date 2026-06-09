# File Upload - Referência

Hook `useFileUpload` de `@blips/ui/hooks/use-file-upload`.

## Hook useFileUpload

```typescript
import { useFileUpload, type FileWithPreview } from '@blips/ui/hooks/use-file-upload'

const [state, actions] = useFileUpload({
  maxFiles: 5,
  maxSize: 5 * 1024 * 1024, // 5MB
  accept: 'image/*,.pdf',
  multiple: true,
  initialFiles: [], // Para edição
  onFilesChange: (files) => console.log('Files:', files),
  onFilesAdded: (newFiles) => console.log('Added:', newFiles),
})
```

## Estado (state)

```typescript
interface FileUploadState {
  files: FileWithPreview[]  // Arquivos selecionados
  isDragging: boolean       // Se está arrastando arquivo sobre a área
  errors: string[]          // Erros de validação
}
```

## Ações (actions)

```typescript
interface FileUploadActions {
  addFiles: (files: FileList | File[]) => void
  removeFile: (id: string) => void
  clearFiles: () => void
  clearErrors: () => void
  handleDragEnter: (e: React.DragEvent) => void
  handleDragLeave: (e: React.DragEvent) => void
  handleDragOver: (e: React.DragEvent) => void
  handleDrop: (e: React.DragEvent) => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  openFileDialog: () => void
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>
}
```

## Opções

| Opção | Tipo | Descrição |
|-------|------|-----------|
| `maxFiles` | `number` | Máximo de arquivos (quando `multiple: true`) |
| `maxSize` | `number` | Tamanho máximo em bytes |
| `accept` | `string` | Tipos aceitos (MIME ou extensões) |
| `multiple` | `boolean` | Permitir múltiplos arquivos |
| `initialFiles` | `FileMetadata[]` | Arquivos iniciais (edição) |
| `onFilesChange` | `(files) => void` | Callback quando arquivos mudam |
| `onFilesAdded` | `(files) => void` | Callback quando novos arquivos são adicionados |

## Componente de Upload

```typescript
import { useFileUpload } from '@blips/ui/hooks/use-file-upload'
import { Upload, X, File } from '@phosphor-icons/react'
import { cn } from '@blips/ui/lib/utils'
import { Button } from '@blips/ui/components/button'

interface FileUploadFieldProps {
  onChange: (files: File[]) => void
  value?: File[]
  maxFiles?: number
  maxSize?: number
  accept?: string
}

function FileUploadField({
  onChange,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  accept = 'image/*,.pdf',
}: FileUploadFieldProps) {
  const [{ files, isDragging, errors }, {
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    removeFile,
    openFileDialog,
    getInputProps,
  }] = useFileUpload({
    maxFiles,
    maxSize,
    accept,
    multiple: maxFiles > 1,
    onFilesChange: (files) => {
      onChange(files.map(f => f.file as File))
    },
  })

  return (
    <div className="space-y-3">
      {/* Área de drop */}
      <div
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          Arraste arquivos ou clique para selecionar
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Máximo {maxFiles} arquivo{maxFiles > 1 ? 's' : ''}, {formatSize(maxSize)} cada
        </p>
      </div>

      {/* Erros */}
      {errors.length > 0 && (
        <div className="text-sm text-destructive">
          {errors.map((error, i) => <p key={i}>{error}</p>)}
        </div>
      )}

      {/* Lista de arquivos */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.id} className="flex items-center gap-2 p-2 border rounded">
              {file.preview ? (
                <img src={file.preview} alt="" className="h-10 w-10 object-cover rounded" />
              ) : (
                <File className="h-10 w-10 text-muted-foreground" />
              )}
              <span className="flex-1 text-sm truncate">
                {'name' in file.file ? file.file.name : ''}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(file.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(0)} MB`
}
```

## Integração com FormField

```typescript
<FormField
  control={form.control}
  name="attachments"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Anexos</FormLabel>
      <FormControl>
        <FileUploadField
          value={field.value}
          onChange={field.onChange}
          maxFiles={5}
          maxSize={10 * 1024 * 1024}
          accept="image/*,.pdf"
        />
      </FormControl>
      <FormDescription>
        Formatos aceitos: imagens e PDF
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Upload Único (Avatar/Imagem)

```typescript
function AvatarUpload({ value, onChange }: {
  value?: File
  onChange: (file: File | null) => void
}) {
  const [{ files }, {
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    openFileDialog,
    getInputProps,
    clearFiles,
  }] = useFileUpload({
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
    accept: 'image/*',
    multiple: false,
    onFilesChange: (files) => {
      onChange(files[0]?.file as File ?? null)
    },
  })

  const preview = files[0]?.preview

  return (
    <div
      onClick={openFileDialog}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className="relative h-24 w-24 rounded-full border-2 border-dashed cursor-pointer overflow-hidden"
    >
      <input {...getInputProps()} />
      {preview ? (
        <>
          <img src={preview} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); clearFiles() }}
            className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center"
          >
            <X className="h-6 w-6 text-white" />
          </button>
        </>
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <Upload className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
    </div>
  )
}
```

## Arquivo de Referência

`packages/ui/src/hooks/use-file-upload.ts`
