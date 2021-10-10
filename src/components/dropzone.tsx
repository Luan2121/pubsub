/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { CSSProperties, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { theme } from '../theme';
import Image from 'next/image';
import { FileWithPreview } from '../types';

const baseStyle : CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 8,
  borderColor: theme.palette.primary,
  borderStyle: 'dashed',
  backgroundColor: '#f6fbfa',
  color: theme.palette.primary,
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

type DropzoneProps = {
    label : string,
    onDrop: (newFiles : FileWithPreview[], allFiles : FileWithPreview[] ) => void
}

const Dropzone = ({ label, onDrop } : DropzoneProps) => {
    const [ files, setFiles ] = useState<FileWithPreview[]>();
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
      accept: 'image/*',
      multiple: true,
      onDrop: acceptedFiles => {
        const acceptedNewFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        const newFiles : FileWithPreview[] = [
            ...acceptedNewFiles,
            ...(files || [])
        ];
        onDrop(acceptedNewFiles,newFiles);
        setFiles( newFiles );
      }
    });

    const style = useMemo<CSSProperties>(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <div className="container">
            <div css = {css`
                margin-bottom: 8px;
            `}>
                {label}
            </div>
            <div {...getRootProps({
                style
            })}>
                <input {...getInputProps()} />
                <p>Carga tu archivo aqui</p>
            </div>
            <div css = {css`
                margin-top: 8px;
                color: #E2E2E2;
                font-size: 12px;
            `}>
                Archivos cargados:
            </div>
            <div css = {css`
                margin-top: 8px;
            `}>
                {files?.map( (file,index) => (
                    <div key = {index} css = {css`
                        display: flex;
                        margin-bottom: 8px;
                    `}>
                        <div>
                            <Image
                                src = {file.preview} 
                                alt = {`file-${index}-preview`} 
                                width = {48}
                                height = {48}
                                objectFit = "cover"
                                css = {css`
                                    border-radius: 8px;
                                `}
                            />
                        </div>
                        <div css = {css`
                            margin-left: 8px;
                        `}>
                            {file.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { Dropzone };