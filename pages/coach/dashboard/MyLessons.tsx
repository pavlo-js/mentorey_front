"use client";

import React, { useState, useEffect } from "react";
import { Paper } from "@mui/material";
// Data grid imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import CircularProgress from "@mui/material/CircularProgress";
// Redux imports
import { useSelector } from "react-redux";
import { selectAuthState } from "~/slices/authSlice";
// Currency Imports
import { CurrencyData } from "~/shared/CurrencyData";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}
function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;
  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function MyLessons() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<any[]>([]);
  const curUser = useSelector(selectAuthState);
  const currencySymbol = CurrencyData[curUser.currency].symbol;

  const [lessons, setLessons] = useState();

  // Get Categories
  useEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    const url = "/api/common/getAllCategories";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error(err));
  }
  // Get Lessons
  useEffect(() => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: curUser.id,
      }),
    };
    const url = "/api/coach/my_lessons";
    fetch(url, request)
      .then((res) => res.json())
      .then((data) => generateRows(data.lessons))
      .finally(() => setLoading(false));
  }, []);

  function generateRows(data: any) {
    const rows = [];
    data.map((item: any, key: number) => {
      const {
        id,
        title,
        type,
        price,
        pack,
        disRate,
        categoryID,
        description,
        purpose,
        created_at,
        updated_at,
      } = item;
      rows.push({
        id,
        index: key + 1,
        title,
      });
    });
  }

  // {
  //   "id": 1,
  //   "ownerID": 17,
  //   "title": "Test Lesson",
  //   "type": "MIXED",
  //   "price": 14,
  //   "pack": 16,
  //   "disRate": 15,
  //   "categoryID": 1,
  //   "description": "Some description. Some description. Some description. Some description. Some description. Some description. ",
  //   "purpose": "Some purpose. Some purpose. Some purpose. Some purpose. Some purpose. ",
  //   "created_at": "2023-08-19T09:22:24.000Z",
  //   "updated_at": "2023-08-19T09:22:24.000Z"
  // }

  const handleEditClick = (id: GridRowId) => () => {};

  const handleDeleteClick = (id: GridRowId) => () => {};

  const myColumns: GridColDef[] = [
    {
      field: "index",
      headerName: "No",
      type: "number",
      width: 50,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "title",
      type: "string",
      headerName: "Title",
      width: 200,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "type",
      type: "string",
      headerName: "Lesson Type",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "category",
      type: "string",
      headerName: "Category",
    },
    {
      field: "price",
      type: "number",
      headerName: `Price (${currencySymbol})`,
      width: 70,
    },
    {
      field: "description",
      type: "string",
      headerName: "Description",
      width: 200,
    },
    {
      field: "createdAt",
      type: "date",
      headerName: "Created At",
    },
    {
      field: "updatedAt",
      type: "date",
      headerName: "Updated At",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Paper className="mx-auto">
        <DataGrid
          rows={rows}
          columns={myColumns}
          loading={loading}
          rowModesModel={rowModesModel}
          autoHeight={true}
          slots={{
            toolbar: EditToolbar,
            loadIcon: CircularProgress,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Paper>
    </>
  );
}
