"use client";
import { Component, ReactNode } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { BiSolidError } from "react-icons/bi";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const { error } = this.state;

      const ErrorComponent = ({
        error,
        reset,
      }: {
        error: Error & { digest?: string };
        reset: () => void;
      }) => {
        return (
          <div className="flex items-center justify-center vertical-center">
            <Card className="w-2/5 mx-auto">
              <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-row gap-2 items-center text-secondary">
                  <BiSolidError size={30} />
                  <h1 className="text-3xl font-semibold">Error</h1>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex justify-center text-danger">
                  {error.message}
                </div>
              </CardBody>
              <CardFooter className="flex justify-center">
                <Button
                  onClick={() => reset()}
                  color="secondary"
                  variant="bordered"
                >
                  Try again
                </Button>
              </CardFooter>
            </Card>
          </div>
        );
      };

      return (
        <ErrorComponent
          error={error}
          reset={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
