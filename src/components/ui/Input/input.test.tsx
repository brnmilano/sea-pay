import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

describe("Input Component", () => {
  test("should match snapshot.", () => {
    const { container } = render(
      <Input
        label="Snapshot Input"
        placeholder="Snapshot Input"
        aria-description="Snapshot Input"
        registerField="snapshot"
        errors={{}}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should check if the passed ref points to the correct DOM element.", () => {
    const ref = { current: null };

    render(
      <Input
        label="Ref Input"
        placeholder="Ref Input"
        aria-description="Ref Input"
        registerField="ref"
        errors={{}}
        ref={ref}
      />,
    );

    const input = screen.getByPlaceholderText("Ref Input");

    expect(input).toBeInTheDocument();
    expect(ref.current).toBe(input);
  });

  test("should render the input with correct label, placeholder and aria-description.", () => {
    render(
      <Input
        label="Test Input"
        placeholder="Enter text"
        aria-description="Test Input"
        registerField="test"
        errors={{}}
      />,
    );

    const input = screen.getByPlaceholderText("Enter text");
    const label = screen.getByText("Test Input");
    const ariaDescription = screen.getByLabelText("Test Input");

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(ariaDescription).toHaveAttribute("aria-description", "Test Input");
    expect(label).toHaveAttribute("for", input.id);
  });

  test("should render the input with the errors and registerField props.", () => {
    const errors = {
      test: {
        type: "required",
        message: "Required field",
      },
    };

    render(
      <Input
        label="Test Input"
        placeholder="Enter text"
        aria-description="Test Input"
        registerField="test"
        errors={errors}
      />,
    );

    const errorMessage = screen.getByText("Required field");
    const errorContainer = errorMessage.parentElement;

    expect(errorMessage).toBeInTheDocument();
    expect(errorContainer).toHaveClass("errorMessage");
    expect(errorContainer).toHaveClass("showingErrorMessage");
  });

  test("should render the correct defaultValue.", () => {
    render(
      <Input
        label="Test Input"
        placeholder="Enter text"
        aria-description="Test Input"
        registerField="test"
        errors={{}}
        defaultValue="Default Value"
      />,
    );

    const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Default Value");
  });

  test("should check keyboard focus (tab) and visible focus indicator.", () => {
    render(
      <Input
        label="Test Input"
        placeholder="Enter text"
        aria-description="Test Input"
        registerField="test"
        errors={{}}
      />,
    );

    const input = screen.getByPlaceholderText("Enter text");

    expect(input).toBeInTheDocument();
    expect(input).not.toHaveFocus();
    expect(document.body).toHaveFocus();

    input.focus();
    expect(input).toHaveFocus();
    expect(document.body).not.toHaveFocus();
  });

  test("should check the integration with react-hook-form by using the registerField prop.", () => {
    const handleChange = jest.fn();

    render(
      <Input
        label="Test Input"
        placeholder="Enter text"
        aria-description="Test Input"
        registerField="test"
        errors={{}}
        onChange={handleChange}
      />,
    );

    const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;

    expect(input).toBeInTheDocument();

    input.focus();
    expect(input).toHaveFocus();

    fireEvent.change(input, { target: { value: "RHF Test" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("RHF Test");
  });

  test("should simulate typing behavior and ensure that onChange is called with the expected value.", () => {
    const handleChange = jest.fn();

    render(
      <Input
        label="Test Input"
        placeholder="Enter text"
        aria-description="Test Input"
        registerField="test"
        errors={{}}
        onChange={handleChange}
      />,
    );

    const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;

    expect(input).toBeInTheDocument();

    input.focus();
    expect(input).toHaveFocus();

    const text = "000.000.000-00";

    for (let i = 0; i < text.length; i++) {
      const newValue = text.slice(0, i + 1);

      fireEvent.change(input, { target: { value: newValue } });

      expect(handleChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: newValue }),
        }),
      );
    }

    expect(input).toHaveValue("000.000.000-00");
  });
});
