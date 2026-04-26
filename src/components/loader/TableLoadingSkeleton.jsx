import { Skeleton, TableCell, TableRow } from "@mui/material";

// Component loading cho table rows
export default function TableLoadingSkeleton({ rowCount = 5, colCount = 6 }) {
    return (
        <>
            {[...Array(rowCount)].map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {[...Array(colCount)].map((_, colIndex) => (
                        <TableCell key={colIndex}>
                            <Skeleton
                                variant='text'
                                width='80%'
                                height={20}
                                animation='wave'
                            />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
}
